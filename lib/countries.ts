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
}

export const countries: Record<Country, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: { code: 'USD', symbol: '$', position: 'before' },
    locale: 'en-US',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mm A'
  },
  CN: {
    code: 'CN',
    name: 'China',
    currency: { code: 'CNY', symbol: '¥', position: 'before' },
    locale: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm'
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'de-DE',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    currency: { code: 'JPY', symbol: '¥', position: 'before' },
    locale: 'ja-JP',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm'
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: { code: 'INR', symbol: '₹', position: 'before' },
    locale: 'en-IN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A'
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: { code: 'GBP', symbol: '£', position: 'before' },
    locale: 'en-GB',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  FR: {
    code: 'FR',
    name: 'France',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'fr-FR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: { code: 'CAD', symbol: 'C$', position: 'before' },
    locale: 'en-CA',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'h:mm A'
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currency: { code: 'AUD', symbol: 'A$', position: 'before' },
    locale: 'en-AU',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm A'
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    currency: { code: 'KRW', symbol: '₩', position: 'before' },
    locale: 'ko-KR',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm'
  },
  BR: {
    code: 'BR',
    name: 'Brazil',
    currency: { code: 'BRL', symbol: 'R$', position: 'before' },
    locale: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  ES: {
    code: 'ES',
    name: 'Spain',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'es-ES',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'it-IT',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  TR: {
    code: 'TR',
    name: 'Turkey',
    currency: { code: 'TRY', symbol: '₺', position: 'before' },
    locale: 'tr-TR',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  MX: {
    code: 'MX',
    name: 'Mexico',
    currency: { code: 'MXN', symbol: '$', position: 'before' },
    locale: 'es-MX',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  TH: {
    code: 'TH',
    name: 'Thailand',
    currency: { code: 'THB', symbol: '฿', position: 'before' },
    locale: 'th-TH',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  VN: {
    code: 'VN',
    name: 'Vietnam',
    currency: { code: 'VND', symbol: '₫', position: 'after' },
    locale: 'vi-VN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: { code: 'SGD', symbol: 'S$', position: 'before' },
    locale: 'en-SG',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: { code: 'AED', symbol: 'د.إ', position: 'before' },
    locale: 'ar-AE',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  CH: {
    code: 'CH',
    name: 'Switzerland',
    currency: { code: 'CHF', symbol: 'CHF', position: 'before' },
    locale: 'de-CH',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  PT: {
    code: 'PT',
    name: 'Portugal',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'pt-PT',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  ID: {
    code: 'ID',
    name: 'Indonesia',
    currency: { code: 'IDR', symbol: 'Rp', position: 'before' },
    locale: 'id-ID',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'nl-NL',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: 'HH:mm'
  },
  SE: {
    code: 'SE',
    name: 'Sweden',
    currency: { code: 'SEK', symbol: 'kr', position: 'after' },
    locale: 'sv-SE',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm'
  },
  NO: {
    code: 'NO',
    name: 'Norway',
    currency: { code: 'NOK', symbol: 'kr', position: 'after' },
    locale: 'nb-NO',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  DK: {
    code: 'DK',
    name: 'Denmark',
    currency: { code: 'DKK', symbol: 'kr', position: 'after' },
    locale: 'da-DK',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  AT: {
    code: 'AT',
    name: 'Austria',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'de-AT',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  BE: {
    code: 'BE',
    name: 'Belgium',
    currency: { code: 'EUR', symbol: '€', position: 'before' },
    locale: 'nl-BE',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  AR: {
    code: 'AR',
    name: 'Argentina',
    currency: { code: 'ARS', symbol: '$', position: 'before' },
    locale: 'es-AR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  EG: {
    code: 'EG',
    name: 'Egypt',
    currency: { code: 'EGP', symbol: 'E£', position: 'before' },
    locale: 'ar-EG',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  RU: {
    code: 'RU',
    name: 'Russia',
    currency: { code: 'RUB', symbol: '₽', position: 'after' },
    locale: 'ru-RU',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm'
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    currency: { code: 'ZAR', symbol: 'R', position: 'before' },
    locale: 'en-ZA',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm'
  },
  ET: {
    code: 'ET',
    name: 'Ethiopia',
    currency: { code: 'ETB', symbol: 'Br', position: 'before' },
    locale: 'am-ET',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  },
  IR: {
    code: 'IR',
    name: 'Iran',
    currency: { code: 'IRR', symbol: '﷼', position: 'after' },
    locale: 'fa-IR',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: 'HH:mm'
  },
  SA: {
    code: 'SA',
    name: 'Saudi Arabia',
    currency: { code: 'SAR', symbol: 'ر.س', position: 'before' },
    locale: 'ar-SA',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm'
  }
};

export const getCountryConfig = (countryCode: Country): CountryConfig => {
  return countries[countryCode] || countries.US;
}; 