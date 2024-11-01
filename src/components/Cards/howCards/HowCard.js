import React from 'react'
import './HowCard.css'

const HowCard = () => {
  return (
    <>
        <div className='card-image-container'>
            <headline className='card-image-headline'>Create</headline> {/*create will be replaced with prop later - three cards are Create, Complete, Reward*/}
        </div>
        <div className='card-switcher-container'> {/*SUPER IMPORTANT: card-switchers will be map/created for however many cards there are, then assigned an ID associated with the position in the card array */}
            <div className='card-switcher-box'>
                <div className='card-switcher'></div>
            </div>
            <div className='card-switcher-box'>
                <div className='card-switcher'></div>
            </div>
            <div className='card-switcher-box'>
                <div className='card-switcher'></div>
            </div>
        </div>
        <div className='card-description-container'>
            <p className='card-description'>Create your very own personalized goal calendar! Pick something you'd like to reward yourself with. Set a number of marbles you'll need to collect in order to earn the reward, making it as easy or challenging as you'd like. Then assign yourself tasks to complete each day, each with their own marble value. Complete the tasks, collect your marbles, and earn your reward!</p> {/*description will be replaced with prop later*/}
        </div>
    </>
  )
}

export default HowCard