import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>Nevermind</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;