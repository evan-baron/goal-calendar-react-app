import React from 'react'
import './Task.css'

const Task = ({ removeTask, taskIndex }) => {
  return (
	<div className='task-container'>
		<input type="text" placeholder={'Task ' + (taskIndex + 1)} />
		<button 
			className='remove-task-btn'
			onClick={() => removeTask(taskIndex)}
		>Remove</button>
	</div>
  )
}

export default Task