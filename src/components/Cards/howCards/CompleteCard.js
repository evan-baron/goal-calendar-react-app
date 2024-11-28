import React from 'react';
import './CompleteCard.css';

const CompleteCard = () => {
	return (
		<div className='howcard-container completecard-container'>
			<div className='howcard-preview complete-preview'>
				Complete Preview Screenshot
			</div>
			<div className='howtext-container completetext-container'>
				<headline className='card-headline'>
					Complete
				</headline>
				<p className='howcard-description complete-description'>{`Time to start earning your marbles by completing your daily tasks. Check off each task you've completed throughout the day. Once you've completed all your tasks, or the day ends, click 'Save' at the bottom. If you've made a mistake, you'll be able to edit your tasks same-day, and if you've checked off tasks but forgotten to save, they'll automatically be saved once the clock strikes midnight; but be careful, once the next day begins, you can't go back!`}</p>
			</div>
			<div className='dashed-arrow-container'>
				<div className='dashed-arrow-line'></div>
				<div className='dashed-arrow-tip'></div>
			</div>
		</div>
	);
};

export default CompleteCard;
