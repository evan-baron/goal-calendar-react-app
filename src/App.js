import React from 'react'
import Calendar from './components/Calendar/Calendar'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div>
        <div>Our Process</div>
        <div>
          <div>Create</div>
          <div>Complete</div>
          <div>Reward</div>
        </div>
      </div>
      <Calendar />
    </>
  )
}

export default App