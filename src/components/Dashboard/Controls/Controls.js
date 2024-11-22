import React, { useState } from 'react'
import './Controls.css'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice'
import { Edit, RestartAlt, Delete, Preview, Save, RocketLaunch } from '@mui/icons-material';

const Controls = ({ setIsModalOpen, setModalType, activeIndex, setNewCalName, newCalName, setEditMode, setEditName, setNavStatus }) => {
    const [previewMode, setPreviewMode] = useState(false);

    const inProgressCalendars = useSelector(selectInProgressCalendars)
    const calendar = inProgressCalendars[activeIndex].calendarId;

    return (
        <div className='controls-container'>
            <div 
                className='controls-option' 
                onClick={() => {
                    setEditMode(true)
                    setNavStatus(true)
                    setPreviewMode(false)
                }}
            >
                <Edit fontSize='large'/>
                <div>Edit</div>
            </div>
            {!previewMode 
            ? 
                <>
                    <div
                        className='controls-option'
                        onClick={() => {
                            setIsModalOpen(true);
                            setModalType('reset-calendar');
                        }}
                    >
                        <RestartAlt fontSize='large'/>
                        <div>Reset</div>
                    </div>
                    <div 
                        className='controls-option'
                        onClick={() => {
                            setIsModalOpen(true);
                            setModalType('delete-calendar');
                        }}
                    >
                        <Delete fontSize='large'/>
                        <div>Delete</div>
                    </div>
                </> 
            : null}
            <div 
                className='controls-option' 
                onClick={() => {
                    setNewCalName(newCalName)
                    setEditName(false)
                    setEditMode(false)
                    setNavStatus(false)
                    setPreviewMode(true)
                }}
            >
                <Preview fontSize='large'/>
                <div>Preview</div>
            </div>
            <div className='controls-option'>
                <Save fontSize='large'/>
                <div>Save</div>
            </div>
            <div className='controls-option'>
                <RocketLaunch fontSize='large'/>
                <div>Launch</div>
            </div>
        </div>
    )
}

export default Controls