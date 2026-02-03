import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const currencies = {
  USD: { symbol: '$', code: 'USD', rate: 1, precision: 2 },
  BTC: { symbol: '₿', code: 'BTC', rate: 0.000018, precision: 6 },
  ETH: { symbol: 'Ξ', code: 'ETH', rate: 0.00035, precision: 5 },
  USDT: { symbol: '₮', code: 'USDT', rate: 1, precision: 2 },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('app-currency');
    return saved ? JSON.parse(saved) : currencies.USD;
  });

  useEffect(() => {
    localStorage.setItem('app-currency', JSON.stringify(currency));
  }, [currency]);

  const formatPrice = (priceInUSD) => {
    const converted = priceInUSD * currency.rate;
    return `${currency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: currency.precision,
      maximumFractionDigits: currency.precision,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
