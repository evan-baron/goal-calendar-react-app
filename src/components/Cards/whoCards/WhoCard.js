import React from 'react';
import './WhoCard.css';
import WhoImg from './WhoImg';
import WhoDescription from './WhoDescription';

const WhoCard = (props) => {
	const orientationClass =
		props.index % 2 === 0 ? 'left-orientation' : 'right-orientation';

	return (
		<div className={`who-card-container ${orientationClass}`}>
			{props.index % 2 === 0 ? (
				<>
					<WhoImg src={props.src} />
					<WhoDescription
						persona={props.persona}
						description={props.description}
					/>
				</>
			) : (
				<>
					<WhoDescription
						persona={props.persona}
						description={props.description}
					/>
					<WhoImg src={props.src} />
				</>
			)}
		</div>
	);
};

export default WhoCard;
