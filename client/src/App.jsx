import React from 'react'
import DarkLightBtn from './components/DarkLightBtn'
import PostCreate from './routes/PostCreate'
import PostList from './routes/PostList'

function App() {
  
  return (
    <div className='container'>
      <DarkLightBtn />
      <h1 className='text-center'>Create a Post</h1>
      <PostCreate />
      <hr className='mt-2'/>
      <h1 className='text-center mt-2'>Posts</h1>
      <PostList />
    </div>
  )
}

export default App