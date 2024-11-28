import React from 'react';
import './WhoCard.css';

const WhoDescription = (props) => {
	return (
		<div className='who-description-container'>
			<h3 className='card-headline'>{props.persona}</h3>
			<p className='who-description'>{props.description}</p>
		</div>
	);
};

export default WhoDescription;
