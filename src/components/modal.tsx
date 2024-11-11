import React, { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, width = 450 }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="absolute top-0 z-50 right-0 left-0 bottom-0 h-screen bg-black/50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg flex justify-center items-center"
        style={{ width: `${width}px` }}
      >
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
