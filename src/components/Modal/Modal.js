import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm, modalType }) => {
    if (!isOpen) return null;

    let message = '';

    switch (modalType) {
        case 'reset-calendar':
            message = "Are you sure you would like to reset all of your changes?"
            break;
        case 'delete-calendar':
            message = "Are you sure you want to delete the calendar?"
            break;
        // case 'too-short-start':
        //     message = "Your calendar may not be shorter than 2 weeks!"
        //     break;
        // case 'before-today-start':
        //     message = "Your calendar may must start today or later!"
        //     break;
        // case 'too-long-start':
        //     message = "We don't know how you got this far, but try again!"
        //     break;
        default:
            message = "Confirm changes?"
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    {/* {modalType === 'too-short-start' || modalType === 'before-today-start'
                    ? <button onClick={onConfirm}>OK</button>
                    : <>
                        <button onClick={onConfirm}>Yes</button>
                        <button onClick={onClose}>Nevermind</button>
                    </>
                    } */}
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>Nevermind</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;