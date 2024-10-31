import React from 'react'
import './Process.css'
import Card from '../../../../components/Card/Card'
import { ArrowCircleRightOutlined } from '@mui/icons-material'
import { ArrowCircleLeftOutlined } from '@mui/icons-material'

const Process = () => {
  return (
    <div className='process-container'>
        <headline className='process-headline'>The Process</headline>
        <div className='card-container'>
            {/* <div className='arrow-container'>
                <div className='card-arrow'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="m480-341 35-35-78.87-78.87h189v-50.26h-189L515-584l-35-35-139 139 139 139Zm.07 241q-78.43 0-147.67-29.92-69.24-29.92-120.89-81.54-51.64-51.63-81.58-120.84Q100-401.51 100-479.93q0-78.84 29.92-148.21t81.54-120.68q51.63-51.31 120.84-81.25Q401.51-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.43-29.92 147.67-29.92 69.24-81.21 120.89-51.29 51.64-120.63 81.58Q558.9-100 480.07-100Zm-.07-50.26q137.79 0 233.77-96.18 95.97-96.18 95.97-233.56 0-137.79-95.97-233.77-95.98-95.97-233.77-95.97-137.38 0-233.56 95.97-96.18 95.98-96.18 233.77 0 137.38 96.18 233.56T480-150.26ZM480-480Z"/></svg>                
                </div>
                <div className='card-arrow'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff">
                        <path d="m480-341 139-139-139-139-35 35 78.87 78.87h-189v50.26h189L445-376l35 35Zm.07 241q-78.43 0-147.67-29.92-69.24-29.92-120.89-81.54-51.64-51.63-81.58-120.84Q100-401.51 100-479.93q0-78.84 29.92-148.21t81.54-120.68q51.63-51.31 120.84-81.25Q401.51-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.43-29.92 147.67-29.92 69.24-81.21 120.89-51.29 51.64-120.63 81.58Q558.9-100 480.07-100Zm-.07-50.26q137.79 0 233.77-96.18 95.97-96.18 95.97-233.56 0-137.79-95.97-233.77-95.98-95.97-233.77-95.97-137.38 0-233.56 95.97-96.18 95.98-96.18 233.77 0 137.38 96.18 233.56T480-150.26ZM480-480Z"/>
                    </svg>
                </div>
            </div> */} {/* arrows will be used for mobile? maybe? keeping code for now */}
            <Card /> {/* props will be used here to transition between cards */}
        </div>
    </div>
  )
}

export default Process