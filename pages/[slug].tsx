import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs';
import { useTranslation, Language } from '../lib/useTranslation';
import { useCountry, Country } from '../lib/useCountry';
import { getCountryConfig } from '../lib/countries';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host || '';
  let slug = context.params?.slug as string | undefined;

  if (host.endsWith('.buukins.com') || host.endsWith('.localhost:3000') || host.endsWith('.localhost')) {
    let base = host.endsWith('.localhost:3000') ? '.localhost:3000' : host.endsWith('.localhost') ? '.localhost' : '.buukins.com';
    const parts = host.replace(base, '').split('.');
    const subdomainSlug = parts.length === 2 ? parts[1] : parts[0];
    if (subdomainSlug && subdomainSlug !== 'www') {
      slug = subdomainSlug;
    }
  }
  // Nếu truy cập qua buukins.com/[slug], redirect sang subdomain
  if (
    host.startsWith('buukins.com') &&
    slug
  ) {
    return {
      redirect: {
        destination: `https://${slug}.buukins.com`,
        permanent: true,
      },
    };
  }
  if (!slug) {
    return { notFound: true };
  }
  // Truyền slug xuống props để component dùng fetch data như cũ
  return {
    props: { slug }
  };
};

export default function BioPage(props: { slug: string }) {
  const { slug } = props;
  const router = useRouter()
  const { t, language, setLanguage } = useTranslation('vi');
  const { country, setCountry, formatCurrency, formatDate, formatTime } = useCountry('VN');
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
  const [availableDates, setAvailableDates] = useState<{date: string, label: string, disabled: boolean}[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingsOfDay, setBookingsOfDay] = useState<any[]>([]);
  const [customerDocId, setCustomerDocId] = useState<string | null>(null);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [themeData, setThemeData] = useState<any>(null);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);

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
        // Fetch theme
        const themeKey = userDoc.data().theme || userDoc.data().bio?.theme || 'default';
        const themeCacheKey = `theme_${themeKey}`;
        let themeObj = null;
        try {
          const cached = localStorage.getItem(themeCacheKey);
          if (cached) {
            themeObj = JSON.parse(cached);
            setThemeData(themeObj);
          }
        } catch (e) {}
        if (!themeObj) {
          const themeRef = doc(db, 'settings', 'themes');
          const themeSnap = await getDoc(themeRef);
          if (themeSnap.exists()) {
            const allThemes = themeSnap.data();
            const theme = allThemes[themeKey] || allThemes['default'];
            setThemeData(theme);
            try {
              localStorage.setItem(themeCacheKey, JSON.stringify(theme));
            } catch (e) {}
          } else {
            setThemeData(null);
          }
        }

        // Fetch language from store_settings
        const storeSettingsRef = doc(db, 'users', userDoc.id, 'settings', 'store_settings');
        const storeSettingsSnap = await getDoc(storeSettingsRef);
        if (storeSettingsSnap.exists()) {
          const storeSettings = storeSettingsSnap.data();
          const storeLanguage = storeSettings.language as Language;
          if (storeLanguage && ['ar', 'en', 'pt', 'de', 'hi', 'ko', 'id', 'ja', 'fr', 'es', 'th', 'zh', 'vi'].includes(storeLanguage)) {
            setLanguage(storeLanguage);
          }
          
          // Fetch country from store_settings
          const storeCountry = storeSettings.country as Country;
          if (storeCountry && ['US', 'CN', 'DE', 'JP', 'IN', 'GB', 'FR', 'CA', 'AU', 'KR', 'BR', 'ES', 'IT', 'TR', 'MX', 'TH', 'VN', 'SG', 'AE', 'CH', 'PT', 'ID', 'NL', 'SE', 'NO', 'DK', 'AT', 'BE', 'AR', 'EG', 'RU', 'ZA', 'ET', 'IR', 'SA'].includes(storeCountry)) {
            setCountry(storeCountry);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error loading store data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [slug, setLanguage, setCountry, t]) // Added setCountry to dependencies

  // Áp dụng biến theme lên body (áp dụng cho toàn trang)
  useEffect(() => {
    if (!themeData) return;
    const root = document.body;
    root.style.setProperty('--backgroundColor', themeData.backgroundColor || '#F5F5F5');
    root.style.setProperty('--surfaceColor', themeData.surfaceColor || '#FFF');
    root.style.setProperty('--textColor', themeData.textColor || '#29303E');
    root.style.setProperty('--primaryColor', themeData.primaryColor || '#2563EC');
    root.style.setProperty('--onPrimaryColor', themeData.onPrimaryColor || '#FFF');
    root.style.setProperty('--borderColor', themeData.borderColor || '#FFF');
    root.style.setProperty('--borderWidth', (themeData.borderWidth ?? 0) + 'px');
    root.style.setProperty('--borderRadius', (themeData.borderRadius ?? 16) + 'px');
    root.style.setProperty('--buttonRadius', (themeData.buttonRadius ?? 100) + 'px');

    root.style.setProperty('--secondaryColor', '#EAEAEA');
    root.style.setProperty('--highlightColor', '#2463EB');
    return () => {
      // Reset về mặc định khi unmount
      root.style.removeProperty('--backgroundColor');
      root.style.removeProperty('--surfaceColor');
      root.style.removeProperty('--textColor');
      root.style.removeProperty('--primaryColor');
      root.style.removeProperty('--onPrimaryColor');
      root.style.removeProperty('--borderColor');
      root.style.removeProperty('--borderWidth');
      root.style.removeProperty('--borderRadius');
      root.style.removeProperty('--buttonRadius');
    };
  }, [themeData]);

  // Fetch working times khi mở form booking
  useEffect(() => {
    if (!showBookingForm || !userId) return;
    const fetchWorkingTimes = async () => {
      setBookingLoading(true);
      try {
        // Fetch từ store_settings thay vì working_times
        const storeSettingsRef = doc(db, 'users', userId, 'settings', 'store_settings');
        const workingTimesRef = doc(db, 'users', userId, 'settings', 'working_times');
        
        const [storeSettingsSnap, workingTimesSnap] = await Promise.all([
          getDoc(storeSettingsRef),
          getDoc(workingTimesRef)
        ]);
        
        let workingSlots = 1; // default
        let workingHours = null;
        let workingDays = [];
        
        if (storeSettingsSnap.exists()) {
          const storeData = storeSettingsSnap.data();
          workingSlots = storeData.workingSlots || 1;
        }
        
        if (workingTimesSnap.exists()) {
          const workingData = workingTimesSnap.data();
          workingHours = {
            start: workingData.workingHours?.start,
            end: workingData.workingHours?.end,
            days: workingData.workingDays || [],
            slots: workingSlots, // Sử dụng workingSlots từ store_settings
          };
        }
        
        setWorkingHours(workingHours);
      } catch (e) {
        console.error('Error fetching working times:', e);
        setWorkingHours(null);
      } finally {
        setBookingLoading(false);
      }
    };
    fetchWorkingTimes();
  }, [showBookingForm, userId]);

  // Tính toán danh sách ngày hợp lệ
  useEffect(() => {
    if (!workingHours) return;
    const daysMap = {
      'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6
    };
    const weekdayNames = [
      t('sunday'), t('monday'), t('tuesday'), t('wednesday'), 
      t('thursday'), t('friday'), t('saturday')
    ];
    const validDays = (workingHours.days || []).map((d: string) => daysMap[d]);
    const today = dayjs();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const d = today.add(i, 'day');
      const dow = d.day();
      const disabled = !validDays.includes(dow);
      
      // Format ngày đơn giản: "thứ, ngày/tháng" hoặc "tháng/ngày"
      const countryConfig = getCountryConfig(country);
      let dateLabel;
      if (countryConfig.dateFormat.includes('DD/MM') || countryConfig.dateFormat.includes('MM/DD')) {
        // Format: "Thứ 2, 15/1" hoặc "Monday, 1/15"
        dateLabel = `${weekdayNames[dow]}, ${d.format('D/M')}`;
      } else {
        // Format: "Thứ 2, 1/15" hoặc "Monday, 1/15"
        dateLabel = `${weekdayNames[dow]}, ${d.format('M/D')}`;
      }
      
      dates.push({
        date: d.format('YYYY-MM-DD'),
        label: dateLabel,
        disabled
      });
    }
    setAvailableDates(dates);
    setBookingDate('');
    setBookingTime('');
  }, [workingHours, country, t]); // Added country to dependencies

  // Fetch bookings khi chọn ngày và service
  useEffect(() => {
    const fetchBookings = async () => {
      if (!bookingDate || !form.serviceId || !userId || !workingHours) return;
      setBookingLoading(true);
      // Lấy tất cả booking của ngày đó, user đó
      const q = query(collection(db, 'bookings'),
        where('userId', '==', userId),
        where('date', '==', bookingDate)
      );
      const snap = await getDocs(q);
      const bookings = snap.docs.map(doc => doc.data());
      setBookingsOfDay(bookings);
      setBookingLoading(false);
    };
    fetchBookings();
  }, [bookingDate, form.serviceId, userId, workingHours]);

  // Tính toán available times với useMemo
  const availableTimes = useMemo(() => {
    if (!bookingDate || !form.serviceId || !workingHours || !storeData) return [];
    
    const selectedService = (storeData.services ?? []).find(s => s.id === form.serviceId);
    if (!selectedService) return [];
    
    const startHour = parseInt(workingHours.start.split(':')[0], 10);
    const endHour = parseInt(workingHours.end.split(':')[0], 10);
    const duration = selectedService.duration;
    const slot = Math.max(1, Number(workingHours.slots) || 1);
    const times: {time: string, label: string, disabled: boolean, full: boolean, bookedByMe: boolean}[] = [];
    
    for (let h = startHour; h < endHour; h++) {
      const blockStart = dayjs(`${bookingDate} ${h.toString().padStart(2, '0')}:00`);
      const blockEnd = blockStart.add(duration, 'minute');
      const label = `${blockStart.format('H:mm')}`;
      
      let isPast = false;
      const now = dayjs();
      if (bookingDate === now.format('YYYY-MM-DD') && h < now.hour()) {
        isPast = true;
      }
      
      if (blockEnd.hour() > endHour || (blockEnd.hour() === endHour && blockEnd.minute() > 0)) {
        times.push({time: blockStart.format('HH:00'), label, disabled: true, full: false, bookedByMe: false});
        continue;
      }
      
      let isFull = false;
      let bookedByMe = false;
      const bookingIntervals = bookingsOfDay
        .filter(b => (b.status === 'confirmed' || b.status === 'pending') && b.date === bookingDate)
        .map(b => {
          const bStart = dayjs(`${b.date} ${b.time}`);
          const bService = (storeData.services ?? []).find(s => s.id === b.serviceId);
          const bDuration = Number(bService?.duration) || 60;
          const bEnd = bStart.add(bDuration, 'minute');
          return { bStart, bEnd, phone: b.phone, status: b.status };
        });
      
      let overlapCount = 0;
      for (const interval of bookingIntervals) {
        if (blockStart.isBefore(interval.bEnd) && interval.bStart.isBefore(blockEnd)) {
          overlapCount++;
          if (interval.phone === form.phone) {
            bookedByMe = true;
          }
        }
      }
      isFull = overlapCount >= slot;
      
      if (bookedByMe) {
        times.push({time: blockStart.format('HH:00'), label: t('booked'), disabled: true, full: false, bookedByMe: true});
      } else if (isFull) {
        times.push({time: blockStart.format('HH:00'), label: t('full'), disabled: true, full: true, bookedByMe: false});
      } else if (isPast) {
        times.push({time: blockStart.format('HH:00'), label, disabled: true, full: false, bookedByMe: false});
      } else {
        times.push({time: blockStart.format('HH:00'), label, disabled: false, full: false, bookedByMe: false});
      }
    }
    
    return times;
  }, [bookingDate, form.serviceId, workingHours, storeData, bookingsOfDay, form.phone, t, formatTime]); // Added formatTime to dependencies

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

  const handleTimeSlotClick = (timeSlot: {time: string, label: string, disabled: boolean, full: boolean, bookedByMe: boolean}) => {
    if (timeSlot.disabled) {
      if (timeSlot.bookedByMe) {
        setSnackMessage(t('alreadyBooked'));
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
      setIsExistingCustomer(true);
    } else {
      setCustomerDocId(null);
      setForm(f => ({ ...f, name: '' }));
      setIsExistingCustomer(false);
    }
  };

  const handleSubmitCustom = async (date: string, time: string) => {
    if (!userId) return;
    setBookingLoading(true);
    try {
      console.log('Starting booking creation...');
      
      // Kiểm tra customer theo số điện thoại và userId
      console.log('Checking customer...');
      const customerQuery = query(
        collection(db, 'customers'), 
        where('phone', '==', form.phone),
        where('userId', '==', userId)
      );
      const customerSnap = await getDocs(customerQuery);
      console.log('Customer check completed');
      
      let customerRef;

      if (!customerSnap.empty) {
        // Nếu tìm thấy customer với số điện thoại và userId này
        customerRef = doc(db, 'customers', customerSnap.docs[0].id);
        // Bỏ phần update tên để tránh lỗi permission
      } else {
        // Tạo customer mới nếu không tìm thấy số điện thoại cho userId này
        customerRef = await addDoc(collection(db, 'customers'), {
          userId: userId,
          fullName: form.name,
          phone: form.phone,
          createdAt: serverTimestamp()
        });
      }

      // FINAL SLOT CHECK (giống logic hiển thị slot)
      const selectedService = (storeData?.services ?? []).find(s => s.id === form.serviceId);
      if (!selectedService) return;
      const duration = selectedService.duration;
      const slot = Math.max(1, Number(workingHours.slots) || 1);
      const blockStart = dayjs(`${date} ${time}`);
      const blockEnd = blockStart.add(duration, 'minute');
      // Lấy tất cả booking đã confirmed và pending của ngày đó
      const bookingsSnap = await getDocs(query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        where('date', '==', date)
      ));
      const bookings = bookingsSnap.docs.map(doc => doc.data());
      const bookingIntervals = bookings
        .filter(b => (b.status === 'confirmed' || b.status === 'pending') && b.date === date)
        .map(b => {
          const bStart = dayjs(`${b.date} ${b.time}`);
          const bService = (storeData?.services ?? []).find(s => s.id === b.serviceId);
          const bDuration = Number(bService?.duration) || 60;
          const bEnd = bStart.add(bDuration, 'minute');
          return { bStart, bEnd, phone: b.phone };
        });
      let overlapCount = 0;
      let alreadyBookedByMe = false;
      for (const interval of bookingIntervals) {
        if (blockStart.isBefore(interval.bEnd) && interval.bStart.isBefore(blockEnd)) {
          overlapCount++;
          // Kiểm tra xem số điện thoại hiện tại đã book slot này chưa
          if (interval.phone === form.phone) {
            alreadyBookedByMe = true;
          }
        }
      }
      if (alreadyBookedByMe) {
        setSnackMessage(t('alreadyBooked'));
        setTimeout(() => setSnackMessage(''), 3000);
        return;
      }
      if (overlapCount >= slot) {
        setSnackMessage(t('noSlots'));
        setTimeout(() => setSnackMessage(''), 3000);
        return;
      }

      // Lấy price từ service đã chọn
      const expectedRevenue = selectedService ? selectedService.price : 0;

      // Tạo booking
      console.log('Creating booking...');
      const bookingData = {
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
      };
      console.log('Booking data to send:', bookingData);
      const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
      console.log('Booking created successfully');

      // Bỏ phần update id để tránh lỗi permission
      // await updateDoc(bookingRef, { id: bookingRef.id });
      setSubmitted(true);
      setShowBookingForm(false);
    } catch (err) {
      console.error('Error creating booking:', err)
      setError('Error creating booking')
    } finally {
      setBookingLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm">{t('loadingStore')}</p>
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
          {t('returnToHome')}
        </button>
      </div>
    </div>
  );

  if (!storeData) return null;

  const visibleServices = (storeData.services ?? [])
    .filter(service => service.isVisible)
    .sort((a, b) => a.order - b.order);

  console.log('themeData:', themeData);

  return (
    <div
      className="main-container"
      // style={{
      //   // Set CSS variables for theme
      //   '--backgroundColor': themeData?.backgroundColor || '#F5F5F5',
      //   '--surfaceColor': themeData?.surfaceColor || '#FFF',
      //   '--textColor': themeData?.textColor || '#29303E',
      //   '--primaryColor': themeData?.primaryColor || '#2563EC',
      //   '--onPrimaryColor': themeData?.onPrimaryColor || '#FFF',
      //   '--borderColor': themeData?.borderColor || '#FFF',
      //   '--borderWidth': (themeData?.borderWidth ?? 0) + 'px',
      //   '--borderRadius': (themeData?.borderRadius ?? 16) + 'px',
      //   '--buttonRadius': (themeData?.buttonRadius ?? 100) + 'px',
      // } as React.CSSProperties}
    >
      <div className="card text-center px-4 pb-4 pt-8 mb-3">
        <div className="avatar">
          <img
            src={storeData.bio.avatarUrl || '/default-avatar.png'}
            alt={storeData.bio.storeName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h1>{storeData.bio.storeName}</h1>
        <p className="text-sm px-6">{storeData.bio.bio}</p>
      </div>
      <div className="card p-4 mb-3 overflow-hidden">
        <h2 className="text-sm font-semibold mb-2">{t('links')}</h2>
        {Object.keys(storeData.bio.socials).length === 0 ? (
          <div className="text-sm py-2 text-gray-500">{t('noLinks')}</div>
        ) : (
          Object.entries(storeData.bio.socials).map(([id, social]) => (
          <a
            key={id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 text-sm"
            style={{ color: 'var(--highlightColor)' }}
          >
            {social.title}
          </a>
          ))
        )}
      </div>
      <div className="card p-4 mb-8">
        <h2 className="text-sm font-semibold mb-2">{t('introduction')}</h2>
        {storeData.bio.intro && storeData.bio.intro.trim() !== '' ? (
          <p className="m-0 text-sm">{storeData.bio.intro}</p>
        ) : (
          <div className="text-sm py-2 text-gray-500">{t('noDescription')}</div>
        )}
      </div>
      {visibleServices.length > 0 && (
      <div className="mt-4">
        <h2 className="text-sm font-semibold px-6">{t('services')}</h2>
        {visibleServices.map(service => (
          <div key={service.id} className="card p-4">
            <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
            <p className="text-sm mb-8 text-gray">{service.description}</p>
            <div className="flex-between">
              <div>
                <p className="font-semibold text-sm m-0 mb-1">{formatCurrency(service.price)}</p>
                <p className="text-sm m-0 text-gray">{service.duration} {t('minutes')}</p>
              </div>
              <button
                onClick={() => handleBookingClick(service)}
                className="button"
              >
                {t('bookAppointment')}
              </button>
            </div>
          </div>
        ))}
        </div>
        )}
        {visibleServices.length === 0 && (
          <div className="text-center py-8">{t('noServices')}</div>
        )}
      {showBookingForm && !submitted && (
        <div className="modal">
          <div className="modal-content card px-0">
            <div className="mb-4">
              <h2 className="text-lg text-center font-semibold">{t('bookAppointment')} {form.serviceName}</h2>
            </div>
            <div className="mb-4">
              <div className="px-3">
                <input
                  type="tel"
                  placeholder={t('phoneNumber')}
                  className="input"
                  value={form.phone}
                  onChange={e => handlePhoneChange(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t('fullName')}
                  className="input"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  disabled={isExistingCustomer}
                />  
              </div>
              <div>
                <h3 className="text-sm font-semibold mt-2 mb-0 ml-1 px-3">{t('selectDate')}</h3>
                <div className="date-grid">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setBookingDate(date.date)}
                  className={`date-button ${date.disabled ? 'disabled' : ''} ${bookingDate === date.date ? 'selected' : ''} ${index === 0 ? 'ml-4' : ''} ${index === availableDates.length - 1 ? 'mr-3' : ''}`}
                  disabled={date.disabled}
                >
                  {date.label}
                </button>
              ))}
            </div>

              </div>
              <div className="px-3">
                {bookingDate && <h3 className="text-sm font-semibold mt-2 mb-0 ml-1">{t('selectTime')}</h3>}
                <div className="time-grid">
              {availableTimes.map((t, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotClick(t)}
                  className={`time-button ${t.disabled ? 'disabled' : ''} ${bookingTime === t.time ? 'selected' : ''} ${t.bookedByMe ? 'booked-by-me' : ''} ${t.full ? 'full' : ''}`}
                  disabled={t.disabled}
                >
                  {t.bookedByMe ? t.label : t.full ? t.label : formatTime(`${bookingDate} ${t.time}`)}
                </button>
              ))}
            </div>
              </div>
            </div>
            <div className="flex space-x-2 justify-end px-3">

              <button
                onClick={() => setShowBookingForm(false)}
                className="button flex-1 min-h-48 px-8"
                style={{ background: 'var(--secondaryColor)', color: 'var(--textColor)' }}
              > {t('cancel')} </button>

              <button
                onClick={() => handleSubmitCustom(bookingDate, bookingTime)}
                className="button flex-1 min-h-48 px-8"
                disabled={!form.name || !form.phone || !bookingDate || !bookingTime || bookingLoading}
                style={{
                  background: (!form.name || !form.phone || !bookingDate || !bookingTime || bookingLoading)
                    ? 'var(--secondaryColor)'
                    : 'var(--primaryColor)',
                  color: (!form.name || !form.phone || !bookingDate || !bookingTime || bookingLoading)
                    ? 'var(--textColor)'
                    : 'var(--onPrimaryColor)',
                  opacity: (!form.name || !form.phone || !bookingDate || !bookingTime || bookingLoading)
                    ? 0.5
                    : 1,
                }}
              > {t('bookNow')} </button>

            </div>
            {bookingLoading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--borderRadius)'}}>
                <div style={{ width: 24, height: 24, border: '3px solid var(--primaryColor)', borderRadius: '50%', borderTop: '3px solid transparent', animation: 'spin 1s linear infinite' }}></div>
              </div>
            )}
          </div>
        </div>
      )}
      {submitted && (
        <div className="modal">
          <div className="modal-content text-center">
            <div style={{ width: 64, height: 64, margin: '0 auto 16px auto', borderRadius: 32, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={32} height={32} style={{ color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#059669' }}>{t('bookingSuccess')}</h2>
            <p className="mb-4">{t('bookingSuccessMessage')}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="button w-full"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
      {snackMessage && (
        <div className="snack">
          <p>{snackMessage}</p>
        </div>
      )}
    </div>
  )
}
