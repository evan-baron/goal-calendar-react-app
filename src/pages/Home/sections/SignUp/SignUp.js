import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
	return (
		<div className='sign-up'>
			<Link to='/signup'>
				<button className='sign-up-button'>Get Started Today</button>
			</Link>
		</div>
	);
};

export default SignUp;
