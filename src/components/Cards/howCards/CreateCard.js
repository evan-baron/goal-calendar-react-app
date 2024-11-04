import React from 'react'
import './CreateCard.css'

const CreateCard = () => {
  return (
    <div className='howcard-container createcard-container'>
        <div className='howcard-preview create-preview'>Create Preview Screenshot</div>
        <div className='howtext-container createtext-container'>
            <headline className='card-headline'>Create</headline>
            <p className='howcard-description create-description'>{`Create your very own personalized goal calendar! First, decide how you want to reward yourself. Next, start inputing your daily tasks. Then assign a marble value to each task (we'd recommend 1 per task). Now you can see how many total marbles you can collect each day. Finally, we'll calculate the total amount you can collect for the duration of the calendar so that you can decide what your threshold will be in order to earn your reward (we'd recommend 80% of the total marbles).`}</p>
        </div>
        <div className='dashed-arrow-container'>
            <div className='dashed-arrow-line'></div>
            <div className='dashed-arrow-tip'></div>
        </div>
    </div>
  )
}

export default CreateCard