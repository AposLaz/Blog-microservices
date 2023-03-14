import React from 'react'
import DarkLightBtn from './components/DarkLightBtn'
import PostCreate from './routes/PostCreate'

function App() {
  return (
    <div className='container'>
      <DarkLightBtn />
      <h1 className='text-center'>Create a Post</h1>
      <PostCreate />
    </div>
  )
}

export default App