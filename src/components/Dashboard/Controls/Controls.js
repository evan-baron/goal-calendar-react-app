import React from 'react'
import './Controls.css'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice'
import { Edit, Delete, Preview, Save, RocketLaunch } from '@mui/icons-material';

const Controls = ({ onDelete, activeIndex }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars)
    const calendar = inProgressCalendars[activeIndex].calendarId;

    return (
        <div className='controls-container'>
            <div className='controls-option'>
                <Edit fontSize='large'/>
                <div>Edit</div>
            </div>
            <div 
                className='controls-option'
                onClick={() => onDelete(calendar)}
            >
                <Delete fontSize='large'/>
                <div>Delete</div>
            </div>
            <div className='controls-option'>
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