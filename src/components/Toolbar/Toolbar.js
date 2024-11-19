import React, { useState } from 'react'
import './Toolbar.css'
import Divider from '../Divider/Divider';
import NewCalendar from '../../features/NewCalendar/NewCalendar';

const Toolbar = () => {
    const [newCalOpen, setNewCalOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);

    function hideshow(toggleFunction, closeFunction = null) {
      toggleFunction(prevStatus => {
        if (prevStatus === false && closeFunction) {
            closeFunction(false);
        }
        return !prevStatus;
      });
    }
    
    return (
        <div className='toolbar'>
            <div className='toolbar-title'>Toolbar</div>
            <Divider />
            <div className='toolbar-menu'>
                <NewCalendar 
                    setNewCalOpen={setNewCalOpen} 
                    setCurCalOpen={setCurCalOpen}
                    newCalOpen={newCalOpen}
                    curCalOpen={curCalOpen}
                />
                <div className='current-calendar-menu'>
                    <div 
                        className={curCalOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                        onClick={() => hideshow(setCurCalOpen, setNewCalOpen)}
                    >
                        Current Calendar
                    </div>
                    {curCalOpen ? (
                        <>
                            <div>Edit</div>
                            <div>Delete</div>
                        </>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}

export default Toolbar