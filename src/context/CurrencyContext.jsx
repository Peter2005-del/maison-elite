import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const currencies = {
  USD: { symbol: '$', code: 'USD', rate: 1, precision: 2 },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // We only support USD now, so we reset any saved crypto currencies
    return currencies.USD;
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
