import React from 'react';

const WhoImg = (props) => {
	return (
		<div
			className='who-img-container'
			style={{ backgroundImage: `url(${props.src})` }}
		></div>
	);
};

export default WhoImg;
