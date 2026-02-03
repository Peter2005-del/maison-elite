import React, { createContext, useContext, useState, useEffect } from 'react';

const SyncContext = createContext();

export const SyncProvider = ({ children }) => {
  const [syncCode, setSyncCode] = useState(null);
  const [isSynced, setIsSynced] = useState(false);

  const generateSyncCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSyncCode(code);
    return code;
  };

  const syncWithCode = (code) => {
    // Simulate finding a session in a "database"
    if (code && code.length === 6) {
      setIsSynced(true);
      // In a real app, we would fetch the cart/user state from a server using this code
      return true;
    }
    return false;
  };

  return (
    <SyncContext.Provider value={{ syncCode, generateSyncCode, syncWithCode, isSynced }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => useContext(SyncContext);
