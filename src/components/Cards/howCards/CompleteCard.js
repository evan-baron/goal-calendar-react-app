import React from 'react'
import './CompleteCard.css'

const CompleteCard = () => {
  return (
    <div className='howcard-container completecard-container'>
        <div className='howcard-preview create-preview'>Complete Preview Screenshot</div>
        <div className='createtext-container'>
            <headline className='card-headline'>Complete</headline>
            <p className='create-description'>Description Text Here</p>
        </div>
        <div className='dashed-arrow-container'>
            <div className='dashed-arrow-line'></div>
            <div className='dashed-arrow-tip'></div>
        </div>
    </div>
  )
}

export default CompleteCard