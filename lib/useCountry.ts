import { useState, useCallback } from 'react';
import { Country, CountryConfig, getCountryConfig } from './countries';

export type { Country };

export const useCountry = (defaultCountry: Country = 'VN') => {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [countryConfig, setCountryConfig] = useState<CountryConfig>(getCountryConfig(defaultCountry));

  const updateCountry = useCallback((newCountry: Country) => {
    setCountry(newCountry);
    setCountryConfig(getCountryConfig(newCountry));
  }, []);

  // Format currency theo country
  const formatCurrency = useCallback((amount: number): string => {
    const { currency } = countryConfig;
    const formattedAmount = new Intl.NumberFormat(countryConfig.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
    
    return formattedAmount;
  }, [countryConfig]);

  // Format date theo country
  const formatDate = useCallback((date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(countryConfig.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);
  }, [countryConfig]);

  // Format time theo country
  const formatTime = useCallback((date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(countryConfig.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: countryConfig.timeFormat.includes('A'),
    }).format(dateObj);
  }, [countryConfig]);

  // Format date time theo country
  const formatDateTime = useCallback((date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(countryConfig.locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: countryConfig.timeFormat.includes('A'),
    }).format(dateObj);
  }, [countryConfig]);

  return {
    country,
    countryConfig,
    setCountry: updateCountry,
    formatCurrency,
    formatDate,
    formatTime,
    formatDateTime,
  };
}; 