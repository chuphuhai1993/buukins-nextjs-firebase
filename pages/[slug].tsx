import { useRouter } from 'next/router'
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  isVisible: boolean;
  order: number;
  slot: number;
}

interface StoreData {
  bio: {
    storeName: string;
    slug: string;
    bio: string;
    intro: string;
    avatarUrl?: string;
    socials: {
      [key: string]: {
        title: string;
        link: string;
      }
    }
  };
  services: Service[];
}

export default function BioPage() {
  const router = useRouter()
  const { slug } = router.query
  const [storeData, setStoreData] = useState<StoreData | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    date: '', 
    time: '',
    serviceId: '',
    serviceName: ''
  })
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [workingHours, setWorkingHours] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<{time: string, label: string, disabled: boolean, full: boolean}[]>([]);
  const [availableDates, setAvailableDates] = useState<{date: string, label: string, disabled: boolean}[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingsOfDay, setBookingsOfDay] = useState<any[]>([]);
  const [customerDocId, setCustomerDocId] = useState<string | null>(null);
  const [snackMessage, setSnackMessage] = useState<string>('');

  useEffect(() => {
    if (!slug) return;
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching data for slug:', slug)
        
        // Query user theo slug
        const q = query(collection(db, 'users'), where('bio.slug', '==', slug));
        const snap = await getDocs(q);
        if (snap.empty) {
          console.log('No data found for slug:', slug)
          setError('Store not found')
          return
        }
        const userDoc = snap.docs[0];
        const userData = userDoc.data() as StoreData;
        setUserId(userDoc.id);

        // Lấy services từ subcollection
        const servicesSnap = await getDocs(collection(db, 'users', userDoc.id, 'services'));
        const services: any[] = [];
        servicesSnap.forEach(doc => services.push(doc.data()));
        userData.services = services;

        console.log('Fetched data:', userData)
        setStoreData(userData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error loading store data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [slug])

  // Fetch working hours khi mở form booking
  useEffect(() => {
    if (!showBookingForm || !userId) return;
    const fetchWorkingHours = async () => {
      setBookingLoading(true);
      try {
        const ref = doc(db, 'users', userId, 'settings', 'working_hours');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setWorkingHours(snap.data().workingHours);
        }
      } catch (e) {
        setWorkingHours(null);
      } finally {
        setBookingLoading(false);
      }
    };
    fetchWorkingHours();
  }, [showBookingForm, userId]);

  // Tính toán danh sách ngày hợp lệ
  useEffect(() => {
    if (!workingHours) return;
    const daysMap = {
      'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6
    };
    const weekdayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const validDays = (workingHours.days || []).map((d: string) => daysMap[d]);
    const today = dayjs();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const d = today.add(i, 'day');
      const dow = d.day();
      const disabled = !validDays.includes(dow);
      dates.push({
        date: d.format('YYYY-MM-DD'),
        label: `${weekdayVi[dow]} - ${d.format('D/M')}`,
        disabled
      });
    }
    setAvailableDates(dates);
    setBookingDate('');
    setBookingTime('');
    setAvailableTimes([]);
  }, [workingHours]);

  // Fetch bookings và tính toán block giờ hợp lệ khi chọn ngày và service
  useEffect(() => {
    const fetchBookingsAndCalcTimes = async () => {
      if (!bookingDate || !form.serviceId || !userId || !workingHours) return;
      setBookingLoading(true);
      // Lấy service đã chọn
      const selectedService = (storeData?.services ?? []).find(s => s.id === form.serviceId);
      if (!selectedService) return;
      // Lấy tất cả booking của ngày đó, user đó, service đó
      const q = query(collection(db, 'bookings'),
        where('userId', '==', userId),
        where('serviceId', '==', form.serviceId),
        where('date', '==', bookingDate)
      );
      const snap = await getDocs(q);
      const bookings = snap.docs.map(doc => doc.data());
      setBookingsOfDay(bookings);
      // Tính toán block giờ
      const startHour = parseInt(workingHours.start.split(':')[0], 10);
      const endHour = parseInt(workingHours.end.split(':')[0], 10);
      const duration = selectedService.duration;
      const slot = selectedService.slot;
      const times: {time: string, label: string, disabled: boolean, full: boolean}[] = [];
      for (let h = startHour; h < endHour; h++) {
        const blockStart = dayjs(`${bookingDate} ${h.toString().padStart(2, '0')}:00`);
        const blockEnd = blockStart.add(duration - 1, 'minute');
        const label = `${blockStart.format('H:mm')} - ${blockStart.add(1, 'hour').format('H:mm')}`;
        // Disable nếu là hôm nay và giờ đã trôi qua
        let isPast = false;
        const now = dayjs();
        if (bookingDate === now.format('YYYY-MM-DD') && h < now.hour()) {
          isPast = true;
        }
        if (blockEnd.hour() > endHour || (blockEnd.hour() === endHour && blockEnd.minute() > 0)) {
          times.push({time: blockStart.format('HH:00'), label, disabled: true, full: false});
          continue;
        }
        // Kiểm tra overlap và slot
        let count = 0;
        let customerBookedThisSlot = false;
        for (const b of bookings) {
          const bStart = dayjs(`${b.date} ${b.time}`);
          const bEnd = bStart.add(duration - 1, 'minute');
          if (bStart.isBefore(blockEnd) && bEnd.isAfter(blockStart)) {
            count++;
            // Kiểm tra xem customer hiện tại đã book khung giờ này chưa
            if (b.phone === form.phone) {
              customerBookedThisSlot = true;
            }
          }
        }
        const isFull = count >= slot;
        const finalLabel = isFull ? `${label} (Đã hết chỗ)` : customerBookedThisSlot ? `${label} (Bạn đã đặt)` : label;
        times.push({time: blockStart.format('HH:00'), label: finalLabel, disabled: count >= slot || isPast || customerBookedThisSlot, full: isFull});
      }
      setAvailableTimes(times);
      setBookingTime('');
      setBookingLoading(false);
    };
    fetchBookingsAndCalcTimes();
  }, [bookingDate, form.serviceId, userId, workingHours, storeData, form.phone]);

  const handleBookingClick = (service: Service) => {
    setForm(prev => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name
    }))
    setBookingDate('')
    setBookingTime('')
    setShowBookingForm(true)
  }

  const handleTimeSlotClick = (timeSlot: {time: string, label: string, disabled: boolean, full: boolean}) => {
    if (timeSlot.disabled) {
      if (timeSlot.label.includes('(đã book)')) {
        setSnackMessage('Bạn đã đặt lịch cho khung giờ này rồi!');
        setTimeout(() => setSnackMessage(''), 3000);
      }
      return;
    }
    setBookingTime(timeSlot.time);
  }

  // Hàm chuẩn hóa số điện thoại về E.164 cho Việt Nam
  function normalizePhoneVN(input: string): string {
    let phone = input.replace(/\D/g, '');
    if (phone.startsWith('84')) phone = '+' + phone;
    else if (phone.startsWith('0')) phone = '+84' + phone.slice(1);
    else if (phone.startsWith('0084')) phone = '+84' + phone.slice(4);
    else if (phone.startsWith('+84')) phone = phone;
    else if (phone.length === 9) phone = '+84' + phone;
    else if (phone.startsWith('1') && phone.length === 10) phone = '+84' + phone;
    else phone = '+' + phone;
    return phone;
  }

  // Khi nhập SĐT, chuẩn hóa và tìm customer
  const handlePhoneChange = async (val: string) => {
    const normalized = normalizePhoneVN(val);
    setForm(f => ({ ...f, phone: normalized }));
    if (normalized.length < 10 || !userId) return;
    // Query customer theo phone và userId
    const q = query(
      collection(db, 'customers'), 
      where('phone', '==', normalized),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const doc = snap.docs[0];
      setCustomerDocId(doc.id);
      const data = doc.data() as any;
      setForm(f => ({ ...f, name: data.fullName || '' }));
    } else {
      setCustomerDocId(null);
    }
  };

  const handleSubmitCustom = async (date: string, time: string) => {
    if (!userId) return;
    try {
      // Kiểm tra customer theo số điện thoại và userId
      const customerQuery = query(
        collection(db, 'customers'), 
        where('phone', '==', form.phone),
        where('userId', '==', userId)
      );
      const customerSnap = await getDocs(customerQuery);
      let customerRef;

      if (!customerSnap.empty) {
        // Nếu tìm thấy customer với số điện thoại và userId này
        customerRef = doc(db, 'customers', customerSnap.docs[0].id);
        // Update tên nếu khác
        if (customerSnap.docs[0].data().fullName !== form.name) {
          await updateDoc(customerRef, { fullName: form.name });
        }
      } else {
        // Tạo customer mới nếu không tìm thấy số điện thoại cho userId này
        customerRef = await addDoc(collection(db, 'customers'), {
          userId: userId,
          fullName: form.name,
          phone: form.phone,
          createdAt: serverTimestamp()
        });
      }

      // Kiểm tra xem customer đã book khung giờ này chưa
      const existingBookingQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        where('serviceId', '==', form.serviceId),
        where('date', '==', date),
        where('time', '==', time),
        where('phone', '==', form.phone)
      );
      const existingBookingSnap = await getDocs(existingBookingQuery);
      
      if (!existingBookingSnap.empty) {
        setError('Bạn đã đặt lịch cho khung giờ này rồi!');
        return;
      }

      // Lấy price từ service đã chọn
      const selectedService = (storeData?.services ?? []).find(s => s.id === form.serviceId);
      const expectedRevenue = selectedService ? selectedService.price : 0;

      // Tạo booking
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        userId: userId,
        customerId: customerRef.id,
        fullName: form.name,
        phone: form.phone,
        serviceId: form.serviceId,
        serviceName: form.serviceName,
        date,
        time,
        status: 'pending',
        expectedRevenue,
        createdAt: serverTimestamp()
      });

      // Update booking với id
      await updateDoc(bookingRef, { id: bookingRef.id });
      setSubmitted(true);
      setShowBookingForm(false);
    } catch (err) {
      console.error('Error creating booking:', err)
      setError('Error creating booking')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading store information...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p className="text-xl font-semibold">{error}</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  if (!storeData) return null;

  const visibleServices = (storeData.services ?? [])
    .filter(service => service.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[520px] mx-auto p-2 sm:px-0">
        {/* Store Header */}
        <div className="bg-white rounded-2xl px-8 pt-3 pb-6 mb-3 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-orange-50">
            <img 
              src={storeData.bio.avatarUrl || '/default-avatar.png'} 
              alt={storeData.bio.storeName}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold mb-2">{storeData.bio.storeName}</h1>
          <p className="text-sm text-gray-600">{storeData.bio.bio}</p>   
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-4 mb-3">
          <h2 className="text-sm font-semibold mb-2">Liên kết</h2>
          {Object.entries(storeData.bio.socials).map(([id, social]) => (
            <a 
              key={id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm mb-1 block text-blue-600 hover:underline"
            >
              {social.link}
            </a>
          ))}
        </div>

        {/* Store Description */}
        <div className="bg-white rounded-2xl p-4 mb-8">
          <h2 className="text-sm font-semibold mb-2">Giới thiệu</h2>
          <p className="text-sm text-gray-600">{storeData.bio.intro}</p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold px-4">Dịch vụ</h2>
          {visibleServices.map(service => (
            <div key={service.id} className="bg-white rounded-2xl p-4">
              <h3 className="text-md font-semibold mb-1">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{service.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">{service.price.toLocaleString()}đ</p>
                  <p className="text-gray-500 text-sm">{service.duration} phút</p>
                </div>
                {service.slot > 0 ? (
                  <button
                    onClick={() => handleBookingClick(service)}
                    className="h-[40px] bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
                  >
                    Đặt lịch
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-200 text-gray-500 px-6 py-2 rounded-full text-sm font-medium"
                  >
                    Hết chỗ
                  </button>
                )}
              </div>
            </div>
          ))}
          {visibleServices.length === 0 && (
            <div className="text-gray-500 text-center py-8">Chưa có dịch vụ nào được hiển thị.</div>
          )}
        </div>

        {/* Booking Form Dialog */}
        {showBookingForm && !submitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-lg">
              <div className="px-4 py-3 border-b">
                <h2 className="text-lg font-semibold">Đặt lịch {form.serviceName}</h2>
              </div>
              <div className="p-4 space-y-4">
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full p-2 text-sm border rounded-lg bg-gray-50"
                  value={form.phone}
                  onChange={e => handlePhoneChange(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full p-2 text-sm border rounded-lg bg-gray-50"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {/* Chọn ngày */}
                <div>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {availableDates.map(d => (
                      <button
                      key={d.date}
                      disabled={d.disabled}
                      className={`px-3 py-2 text-sm rounded-full whitespace-nowrap
                        ${d.disabled
                          ? 'opacity-40 cursor-not-allowed bg-gray-200'
                          : `border-2 ${bookingDate === d.date ? 'border-black font-semibold' : 'border-gray-200 hover:border-black'} bg-white`}
                      `}
                      onClick={() => setBookingDate(d.date)}
                    >
                      {d.label}
                    </button>                                        
                    ))}
                  </div>
                </div>
                {/* Chọn giờ */}
                <div>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map(t => (
                      <button
                      key={t.time}
                      disabled={t.disabled}
                      className={`px-1 py-3 rounded-lg text-sm
                        ${t.full
                          ? 'bg-red-100' // Không có border
                          : `border-2 ${bookingTime === t.time ? 'border-black font-semibold' : 'border-gray-200 hover:border-black'}`
                        }
                        ${t.disabled ? 'opacity-40 cursor-not-allowed bg-gray-200' : ''}
                      `}
                      onClick={() => handleTimeSlotClick(t)}
                    >
                      {t.label}
                    </button>                    
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t space-x-3 flex">
                <button
                  onClick={() => handleSubmitCustom(bookingDate, bookingTime)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium text-sm hover:bg-blue-700 disabled:opacity-50"
                  disabled={!form.name || !form.phone || !bookingDate || !bookingTime || bookingLoading}
                >
                  Đặt ngay
                </button>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-100 py-3 rounded-full font-medium text-sm hover:bg-gray-200"
                >
                  Hủy
                </button>
              </div>
              {bookingLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-green-600">Đặt lịch thành công!</h2>
              <p className="text-gray-600 mb-4">Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Snack Message */}
        {snackMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
              <p>{snackMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // để page đảm bảo có dữ liệu ngay từ server
  }
}
