import React from 'react'
import './WhoItsFor.css'
import WhoCard from '../../../../components/Cards/whoCards/WhoCard'
import WhoData from '../../../../components/Cards/whoCards/WhoData'

const WhoItsFor = () => {
  return (
    <div className='whoitsfor-container'>
      <headline className='whoitsfor-headline section-title'>Who It's For</headline>
      <div className='who-cards-container'>
        {WhoData.map((item, index) => (
          <WhoCard 
            key={item.id}
            src={item.src}
            persona={item.persona}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default WhoItsFor