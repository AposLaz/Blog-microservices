import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { createPost } from '../api/posts-api';

const styleInput = {
  width: '350px', 
  maxWidth: '350px',
  ' @media (max-width:442px)':{
    width: 'auto'
  }
}

function PostCreate() {
  
  const [title, setTitle] = useState('')

  const submitPost = async (e)=>{
    e.preventDefault()
                createPost(title)
                .then(setTitle(''))
                .catch((error)=>{
                  console.log(error)
                })
  }
  return (
    <div className='container'>
        <form className='flex flex-column justifyCenter alignCenter' 
              onSubmit={(e)=>{submitPost(e)}}
        >
            <div className='form-group flex flex-column justifyCenter alignCenter mt-1'>
                <TextField 
                    id="post-title" 
                    sx={styleInput} 
                    label="Title" 
                    variant="outlined" 
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary mt-1'>Submit</button>
        </form>
    </div>
  )
}

export default PostCreate