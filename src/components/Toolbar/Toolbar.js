import React, { useState } from 'react'
import './Toolbar.css'
import Divider from '../Divider/Divider'
import NewCalendar from '../../features/NewCalendar/NewCalendar';
import InProgressCalendar from './InProgressCalendar/InProgressCalendar';
import CurrentCalendar from './CurrentCalendar/CurrentCalendar';
import { Add, Remove } from '@mui/icons-material';

const Toolbar = ({ activeIndex, setActiveIndex, onDelete }) => {
    const [navStatus, setNavStatus] = useState(true);
    const [newCalOpen, setNewCalOpen] = useState(false);
    const [inProgOpen, setInProgOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);
    const [calendars, setCalendars] = useState(false);

    function hideshow(section) {
      setNewCalOpen(false)
      setInProgOpen(false)
      setCurCalOpen(false)

      if (section === 'new') setNewCalOpen(true);
      if (section === 'inProgress') setInProgOpen(true);
      if (section === 'current') setCurCalOpen(true);
    }

    return (
        <div className={`nav-container ${navStatus ? 'nav-show' : 'nav-hide'}`}>
            <div className='toolbar'>
                <div className='toolbar-title'>Toolbar</div>
                <Divider />
                {/* <div className={calendars ? 'toolbar-section selected' : 'toolbar-section'}> */} {/* add back if i want to keep section title selected */}
                <div className='toolbar-section'>
                    <div 
                        className='toolbar-title'
                        onClick={() => setCalendars(prev => !prev)}
                    >
                        Calendars
                    </div>
                    {!calendars 
                        ? <Add fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <Remove fontSize='large' sx={{cursor: 'pointer'}} />}
                </div>
                {calendars ? (
                    <div className='toolbar-menu'>
                        <CurrentCalendar 
                            hideshow={hideshow}
                            isOpen={curCalOpen}
                        />
                        <NewCalendar 
                            hideshow={hideshow}
                            isOpen={newCalOpen}
                        />
                        <InProgressCalendar 
                            hideshow={hideshow} 
                            isOpen={inProgOpen}
                            onDelete={onDelete}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        />
                    </div>
                ) : null}
            </div>
            <div className='nav-hideshow'>
            <div className='nav-hideshow-btn' onClick={() => setNavStatus(status => !status)}>
                <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
            </div>
            </div>
        </div>
    )
}

export default Toolbar