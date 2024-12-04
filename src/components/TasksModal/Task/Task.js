import React from 'react'
import './Task.css'

const Task = ({ task, removeTask, taskIndex }) => {
  return (
	<div className='task-container'>
		<input 
			className='task-input' 
			type="text" 
			placeholder={task}
			maxLength={60}
		/>
		<button 
			className='remove-task-btn'
			onClick={() => removeTask(taskIndex)}
		>Remove</button>
	</div>
  )
}

export default Task