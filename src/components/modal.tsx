"use client";
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
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg overflow-y-auto max-h-[90vh] w-full md:w-auto"
        style={{ width: `${width}px`, maxHeight: "90vh" }}
      >
        <div className="w-full p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
