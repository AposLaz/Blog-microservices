import React from 'react'
import DarkLightBtn from './components/DarkLightBtn'
import PostCreate from './routes/PostCreate'

function App() {
  return (
    <div>
      <DarkLightBtn />
      Blog App
      <PostCreate />
    </div>
  )
}

export default App