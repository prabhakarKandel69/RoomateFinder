import React, { useEffect, useState } from "react";

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 max-w-full sm:max-w-sm px-4 py-2 rounded shadow-lg z-[100] ${
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm sm:text-base">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
