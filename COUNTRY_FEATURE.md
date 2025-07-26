# Tính năng Country (Quốc gia)

## Tổng quan
Tính năng Country cho phép hiển thị tiền tệ và định dạng ngày/giờ theo chuẩn của từng quốc gia.

## Các quốc gia được hỗ trợ
- **US** - United States (USD, $)
- **CN** - China (CNY, ¥)
- **DE** - Germany (EUR, €)
- **JP** - Japan (JPY, ¥)
- **IN** - India (INR, ₹)
- **GB** - United Kingdom (GBP, £)
- **FR** - France (EUR, €)
- **CA** - Canada (CAD, C$)
- **AU** - Australia (AUD, A$)
- **KR** - South Korea (KRW, ₩)
- **BR** - Brazil (BRL, R$)
- **ES** - Spain (EUR, €)
- **IT** - Italy (EUR, €)
- **TR** - Turkey (TRY, ₺)
- **MX** - Mexico (MXN, $)
- **TH** - Thailand (THB, ฿)
- **VN** - Vietnam (VND, ₫)
- **SG** - Singapore (SGD, S$)
- **AE** - United Arab Emirates (AED, د.إ)
- **CH** - Switzerland (CHF, CHF)
- **PT** - Portugal (EUR, €)
- **ID** - Indonesia (IDR, Rp)
- **NL** - Netherlands (EUR, €)
- **SE** - Sweden (SEK, kr)
- **NO** - Norway (NOK, kr)
- **DK** - Denmark (DKK, kr)
- **AT** - Austria (EUR, €)
- **BE** - Belgium (EUR, €)
- **AR** - Argentina (ARS, $)
- **EG** - Egypt (EGP, E£)
- **RU** - Russia (RUB, ₽)
- **ZA** - South Africa (ZAR, R)
- **ET** - Ethiopia (ETB, Br)
- **IR** - Iran (IRR, ﷼)
- **SA** - Saudi Arabia (SAR, ر.س)

## Cách sử dụng

### 1. Cấu hình Country trong Firestore
```javascript
// Đường dẫn: users/{uid}/settings/store_settings/country
// Giá trị: Một trong các mã quốc gia được hỗ trợ (ví dụ: 'VN', 'US', 'JP')
```

### 2. Hook useCountry
```typescript
import { useCountry } from '../lib/useCountry';

const { 
  country, 
  countryConfig, 
  setCountry, 
  formatCurrency, 
  formatDate, 
  formatTime, 
  formatDateTime 
} = useCountry('VN');
```

### 3. Các function format

#### formatCurrency(amount: number): string
```typescript
// Ví dụ với VN (VND)
formatCurrency(100000) // "₫100,000"

// Ví dụ với US (USD)
formatCurrency(100) // "$100.00"
```

#### formatDate(date: Date | string): string
```typescript
// Ví dụ với VN
formatDate('2024-01-15') // "15/01/2024"

// Ví dụ với US
formatDate('2024-01-15') // "01/15/2024"
```

#### formatTime(date: Date | string): string
```typescript
// Ví dụ với VN
formatTime('2024-01-15 14:30') // "14:30"

// Ví dụ với US
formatTime('2024-01-15 14:30') // "2:30 PM"
```

#### formatDateTime(date: Date | string): string
```typescript
// Ví dụ với VN
formatDateTime('2024-01-15 14:30') // "15/01/2024 14:30"

// Ví dụ với US
formatDateTime('2024-01-15 14:30') // "01/15/2024 2:30 PM"
```

## Tích hợp vào trang

### 1. Import và khởi tạo
```typescript
import { useCountry, Country } from '../lib/useCountry';

export default function BioPage() {
  const { country, setCountry, formatCurrency, formatDate, formatTime } = useCountry('VN');
  
  // Fetch country từ Firestore
  useEffect(() => {
    const fetchCountry = async () => {
      const storeSettingsRef = doc(db, 'users', userId, 'settings', 'store_settings');
      const storeSettingsSnap = await getDoc(storeSettingsRef);
      if (storeSettingsSnap.exists()) {
        const storeSettings = storeSettingsSnap.data();
        const storeCountry = storeSettings.country as Country;
        if (storeCountry) {
          setCountry(storeCountry);
        }
      }
    };
    fetchCountry();
  }, [userId, setCountry]);
}
```

### 2. Áp dụng vào UI
```typescript
// Format giá dịch vụ
<p className="price">{formatCurrency(service.price)}</p>

// Format ngày
<span className="date">{formatDate(bookingDate)}</span>

// Format thời gian
<span className="time">{formatTime(`${date} ${time}`)}</span>
```

## Cấu trúc file

### lib/countries.ts
- Định nghĩa type `Country`
- Interface `CountryConfig`
- Object `countries` chứa cấu hình cho tất cả quốc gia
- Function `getCountryConfig()`

### lib/useCountry.ts
- Hook `useCountry` để quản lý state và cung cấp các function format
- Các function: `formatCurrency`, `formatDate`, `formatTime`, `formatDateTime`

### styles/country.css
- CSS cho các component date-grid và time-grid
- Responsive design cho mobile

## Lưu ý
- Country được fetch từ `users/{uid}/settings/store_settings/country`
- Nếu không có country hoặc country không hợp lệ, sẽ sử dụng default là 'VN'
- Tất cả các function format đều sử dụng `Intl` API của JavaScript để đảm bảo tính chính xác
- CSS được tối ưu cho responsive design 