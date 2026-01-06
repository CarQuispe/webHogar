// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useCallback } from "react";
import { toast } from "sonner";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notifySuccess = useCallback((message) => {
    toast.success(message);
  }, []);

  const notifyError = useCallback((message) => {
    toast.error(message);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

