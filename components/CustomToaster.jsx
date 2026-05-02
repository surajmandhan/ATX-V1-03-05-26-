"use client";

import { Toaster, toast, resolveValue } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster 
      position="top-right"
      containerStyle={{
        top: 80,
        zIndex: 999999,
      }}
    >
      {(t) => {
        const typeClass = t.type === "success" ? "success" : t.type === "error" ? "error" : t.type === "blank" ? "help" : "warning";
        const title = t.type === "success" ? "Success!" : t.type === "error" ? "Error!" : t.type === "blank" ? "Help!" : "Warning!";
        
        return (
          <div className={`custom-toast ${typeClass} ${t.visible ? "custom-animate-enter" : "custom-animate-leave"}`}>
            <div 
              className="custom-toast-close" 
              onClick={() => toast.dismiss(t.id)}
            ></div>
            <h3>{title}</h3>
            <p>{resolveValue(t.message, t)}</p>
          </div>
        );
      }}
    </Toaster>
  );
}
