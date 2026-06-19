import { createContext, useContext, useState, useRef } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ msg: "", type: "", show: false });
  const timer = useRef(null);

  function showToast(msg, type = "") {
    setToast({ msg, type, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToast(t => ({ ...t, show: false }));
    }, 2400);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={"toast" + (toast.show ? " show" : "") + (toast.type ? " " + toast.type : "")}>
        {toast.msg}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
