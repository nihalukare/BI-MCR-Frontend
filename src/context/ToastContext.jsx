import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToasts = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type) {
    const toastId = Date.now();
    const newToast = { id: toastId, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
    }, 3000);
  }

  function removeToast(toastId) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
