import React from 'react'
import Calendar from './components/Calendar/Calendar'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div>Our Process</div>
        <div>
          <div>Create</div>
          <div>Complete</div>
          <div>Reward</div>
        </div>
      </main>
      <Calendar />
    </>
  )
}

export default App