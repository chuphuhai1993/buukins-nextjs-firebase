export type Country = 
  | 'US' | 'CN' | 'DE' | 'JP' | 'IN' | 'GB' | 'FR' | 'CA' | 'AU' | 'KR' 
  | 'BR' | 'ES' | 'IT' | 'TR' | 'MX' | 'TH' | 'VN' | 'SG' | 'AE' | 'CH' 
  | 'PT' | 'ID' | 'NL' | 'SE' | 'NO' | 'DK' | 'AT' | 'BE' | 'AR' | 'EG' 
  | 'RU' | 'ZA' | 'ET' | 'IR' | 'SA';

export interface CountryConfig {
  code: Country;
  name: string;
  currency: {
    code: string;
    symbol: string;
    position: 'before' | 'after';
  };
  locale: string;
  dateFormat: string;
  timeFormat: string;
  dialCode: string;
  flag: string;
}

export const countries: Record<Country, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: { code: 'USD', symbol: '$', position: 'before' },
    locale: 'en-US',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm A',
    dialCode: '+1',
    flag: '🇺🇸'
  },
  CN: {
    code: 'CN',
    name: 'China',
    currency: { code: 'CNY', symbol: '¥', position: 'before' },
    locale: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    dialCode: '+86',
    flag: '🇨🇳'
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'de-DE',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+49',
    flag: '🇩🇪'
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    currency: { code: 'JPY', symbol: '¥', position: 'before' },
    locale: 'ja-JP',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm',
    dialCode: '+81',
    flag: '🇯🇵'
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: { code: 'INR', symbol: '₹', position: 'before' },
    locale: 'en-IN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A',
    dialCode: '+91',
    flag: '🇮🇳'
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: { code: 'GBP', symbol: '£', position: 'before' },
    locale: 'en-GB',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+44',
    flag: '🇬🇧'
  },
  FR: {
    code: 'FR',
    name: 'France',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'fr-FR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+33',
    flag: '🇫🇷'
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: { code: 'CAD', symbol: 'C$', position: 'before' },
    locale: 'en-CA',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'h:mm A',
    dialCode: '+1',
    flag: '🇨🇦'
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: { code: 'AUD', symbol: 'A$', position: 'before' },
    locale: 'en-AU',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A',
    dialCode: '+61',
    flag: '🇦🇺'
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    currency: { code: 'KRW', symbol: '₩', position: 'before' },
    locale: 'ko-KR',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    dialCode: '+82',
    flag: '🇰🇷'
  },
  BR: {
    code: 'BR',
    name: 'Brazil',
    currency: { code: 'BRL', symbol: 'R$', position: 'before' },
    locale: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+55',
    flag: '🇧🇷'
  },
  ES: {
    code: 'ES',
    name: 'Spain',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'es-ES',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+34',
    flag: '🇪🇸'
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'it-IT',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+39',
    flag: '🇮🇹'
  },
  TR: {
    code: 'TR',
    name: 'Turkey',
    currency: { code: 'TRY', symbol: '₺', position: 'before' },
    locale: 'tr-TR',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+90',
    flag: '🇹🇷'
  },
  MX: {
    code: 'MX',
    name: 'Mexico',
    currency: { code: 'MXN', symbol: '$', position: 'before' },
    locale: 'es-MX',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+52',
    flag: '🇲🇽'
  },
  TH: {
    code: 'TH',
    name: 'Thailand',
    currency: { code: 'THB', symbol: '฿', position: 'before' },
    locale: 'th-TH',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+66',
    flag: '🇹🇭'
  },
  VN: {
    code: 'VN',
    name: 'Vietnam',
    currency: { code: 'VND', symbol: '₫', position: 'after' },
    locale: 'vi-VN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+84',
    flag: '🇻🇳'
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: { code: 'SGD', symbol: 'S$', position: 'before' },
    locale: 'en-SG',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+65',
    flag: '🇸🇬'
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: { code: 'AED', symbol: 'د.إ', position: 'before' },
    locale: 'ar-AE',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+971',
    flag: '🇦🇪'
  },
  CH: {
    code: 'CH',
    name: 'Switzerland',
    currency: { code: 'CHF', symbol: 'CHF', position: 'before' },
    locale: 'de-CH',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+41',
    flag: '🇨🇭'
  },
  PT: {
    code: 'PT',
    name: 'Portugal',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'pt-PT',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+351',
    flag: '🇵🇹'
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    currency: { code: 'IDR', symbol: 'Rp', position: 'before' },
    locale: 'id-ID',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+62',
    flag: '🇮🇩'
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'nl-NL',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+31',
    flag: '🇳🇱'
  },
  SE: {
    code: 'SE',
    name: 'Sweden',
    currency: { code: 'SEK', symbol: 'kr', position: 'after' },
    locale: 'sv-SE',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    dialCode: '+46',
    flag: '🇸🇪'
  },
  NO: {
    code: 'NO',
    name: 'Norway',
    currency: { code: 'NOK', symbol: 'kr', position: 'after' },
    locale: 'nb-NO',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+47',
    flag: '🇳🇴'
  },
  DK: {
    code: 'DK',
    name: 'Denmark',
    currency: { code: 'DKK', symbol: 'kr', position: 'after' },
    locale: 'da-DK',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+45',
    flag: '🇩🇰'
  },
  AT: {
    code: 'AT',
    name: 'Austria',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'de-AT',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+43',
    flag: '🇦🇹'
  },
  BE: {
    code: 'BE',
    name: 'Belgium',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'nl-BE',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+32',
    flag: '🇧🇪'
  },
  AR: {
    code: 'AR',
    name: 'Argentina',
    currency: { code: 'ARS', symbol: '$', position: 'before' },
    locale: 'es-AR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+54',
    flag: '🇦🇷'
  },
  EG: {
    code: 'EG',
    name: 'Egypt',
    currency: { code: 'EGP', symbol: 'E£', position: 'before' },
    locale: 'ar-EG',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+20',
    flag: '🇪🇬'
  },
  RU: {
    code: 'RU',
    name: 'Russia',
    currency: { code: 'RUB', symbol: '₽', position: 'after' },
    locale: 'ru-RU',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+7',
    flag: '🇷🇺'
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    currency: { code: 'ZAR', symbol: 'R', position: 'before' },
    locale: 'en-ZA',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm',
    dialCode: '+27',
    flag: '🇿🇦'
  },
  ET: {
    code: 'ET',
    name: 'Ethiopia',
    currency: { code: 'ETB', symbol: 'Br', position: 'before' },
    locale: 'am-ET',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+251',
    flag: '🇪🇹'
  },
  IR: {
    code: 'IR',
    name: 'Iran',
    currency: { code: 'IRR', symbol: '﷼', position: 'after' },
    locale: 'fa-IR',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm',
    dialCode: '+98',
    flag: '🇮🇷'
  },
  SA: {
    code: 'SA',
    name: 'Saudi Arabia',
    currency: { code: 'SAR', symbol: 'ر.س', position: 'before' },
    locale: 'ar-SA',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    dialCode: '+966',
    flag: '🇸🇦'
  }
};

export const getCountryConfig = (countryCode: Country): CountryConfig => {
  return countries[countryCode] || countries.US;
}; 