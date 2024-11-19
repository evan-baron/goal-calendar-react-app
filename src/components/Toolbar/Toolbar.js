import React, { useState } from 'react'
import './Toolbar.css'
import Divider from '../Divider/Divider'
import NewCalendar from '../../features/NewCalendar/NewCalendar';
import InProgressCalendar from './InProgressCalendar/InProgressCalendar';
import CurrentCalendar from './CurrentCalendar/CurrentCalendar';

const Toolbar = () => {
    const [navStatus, setNavStatus] = useState(true);
    const [newCalOpen, setNewCalOpen] = useState(false);
    const [inProgOpen, setInProgOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);

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
                <div className='toolbar-menu'>
                    <NewCalendar 
                        hideshow={hideshow}
                        isOpen={newCalOpen}
                    />
                    <InProgressCalendar 
                        hideshow={hideshow} 
                        isOpen={inProgOpen}
                    />
                    <CurrentCalendar 
                        hideshow={hideshow}
                        isOpen={curCalOpen}
                    />
                </div>
            </div>
            <div className='nav-hideshow'>
            <div className='nav-hideshow-btn' onClick={() => hideshow(setNavStatus)}>
                <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
            </div>
            </div>
        </div>
    )
}

export default Toolbar