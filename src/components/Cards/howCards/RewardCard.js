import React from 'react'
import './RewardCard.css'

const RewardCard = () => {
  return (
    <div className='howcard-container rewardcard-container'>
        <div className='howcard-preview create-preview'>Reward Preview Screenshot</div>
        <div className='createtext-container'>
            <headline className='card-headline'>Reward</headline>
            <p className='create-description'>Description Text Here</p>
        </div>
    </div>
  )
}

export default RewardCard