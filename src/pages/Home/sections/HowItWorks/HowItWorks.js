import React from 'react';
import './HowItWorks.css';
import HowCard from '../../../../components/Cards/howCards/HowCard';

const HowItWorks = () => {
	return (
		<div className='howitworks-container'>
			<headline className='howitworks-headline section-title'>
				How It Works
			</headline>
			<div className='card-container'>
				<HowCard />{' '}
				{/* props will be used here to transition between cards */}
			</div>
		</div>
	);
};

export default HowItWorks;
