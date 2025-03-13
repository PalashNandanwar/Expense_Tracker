import React from 'react'
import Heading from './Component/Heading'
import MainPart from './Component/MainPart'

const App = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col gap-4'>
        <Heading />
        <MainPart />
      </div>
    </>
  )
}

export default App