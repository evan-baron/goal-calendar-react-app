import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm, modalType, setModalType }) => {
    if (!isOpen) return null;

    let message = '';

    switch (modalType) {
        case 'reset-calendar':
            message = "Are you sure you would like to reset all of your changes?"
            break;
        case 'delete-calendar':
            message = "Are you sure you want to delete the calendar?"
            break;
        case 'change-calendars':
            message = "You must save your changes before changing calendars."
            break;
        case 'discard-changes':
            message = "Are you sure you want to discard all your changes?"
            break;
        case 'save-changes':
            message = "Save all changes?"
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
                {modalType === 'change-calendars'
                    ? <div className='modal-buttons-change-calendars'>
                        <div className='change-buttons'>
                            <button onClick={onConfirm}>Save</button>
                            <button onClick={() => {
                                setModalType('discard-changes')
                            }}>Discard</button>
                        </div>
                        <button className='modal-cancel-button' onClick={onClose}>Cancel</button>
                    </div>
                    : <div className='modal-buttons'>
                        <button onClick={onConfirm}>Yes</button>
                        <button onClick={onClose}>Nevermind</button>
                    </div>
                }
                {/* <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>Nevermind</button> */}
            </div>
        </div>
    );
};

export default Modal;