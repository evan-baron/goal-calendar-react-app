import React from 'react'
import './CreateCard.css'

const CreateCard = () => {
  return (
    <div className='howcard-container createcard-container'>
        <div className='howcard-preview create-preview'>Create Preview Screenshot</div>
        <div className='createtext-container'>
            <headline className='card-headline'>Create</headline>
            <p className='create-description'>Description Text Here</p>
        </div>
        <div className='dashed-arrow-container'>
            <div className='dashed-arrow-line'></div>
            <div className='dashed-arrow-tip'></div>
        </div>
    </div>
  )
}

export default CreateCard