import React from "react";

import './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal ({isOpen, onClose, children}: ModalProps) {
  if(!isOpen) {
    return null;
  }

  return (
    <div className="ModalPage">
      <div className="ModalContainer">
        <button className="CloseButton" onClick={onClose}>close</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;
