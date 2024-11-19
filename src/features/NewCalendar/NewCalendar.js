import React, { useState } from 'react'
import DatePicker from '../../components/DatePicker/DatePicker'

const NewCalendar = ({ setNewCalOpen, setCurCalOpen, newCalOpen, curCalOpen }) => {
    function hideshow(toggleFunction, closeFunction = null) {
      toggleFunction(prevStatus => {
        if (prevStatus === false && closeFunction) {
            closeFunction(false);
        }
        return !prevStatus;
      });
    }

  return (
    <div className='new-calendar'>
        <div 
            className={newCalOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideshow(setNewCalOpen, setCurCalOpen)}
        >
            New Calendar
        </div>
        {newCalOpen ? (
        <div className='new-calendar-menu'>
            <div className='calendar-name'>
                <div className='menu-title'>Calendar Name:</div>
                <input type="text"></input>
            </div>
            <div className='calendar-dates'>
                <div className='menu-title'>Select Dates:</div>
                <div className='date-selector'>
                    <div className='start-date'>Start Date:</div>
                    <DatePicker />
                </div>
                <div className='date-selector'>
                    <div className='end-date'>End Date:</div>
                    <DatePicker />
                </div>
            </div>
            <button className='create-calendar'>Create</button>
        </div>) : ''}
        {/* <div>Select Dates</div>
        <div>Edit Tasks</div>
        <div>Edit Reward</div> */}
    </div>
  )
}

export default NewCalendar