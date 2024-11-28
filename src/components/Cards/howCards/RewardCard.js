import React from 'react';
import './RewardCard.css';

const RewardCard = () => {
	return (
		<div className='howcard-container rewardcard-container'>
			<div className='howcard-preview reward-preview'>
				Reward Preview Screenshot
			</div>
			<div className='howtext-container rewardtext-container'>
				<headline className='card-headline'>Reward</headline>
				<p className='howcard-description reward-description'>{`Congratulations! You've made it to the end of your calendar! If you've accomplished your goal and met the marble threshold you set for yourself, you've earned your reward! If you haven't, don't fret - there's always next month!`}</p>
			</div>
		</div>
	);
};

export default RewardCard;
