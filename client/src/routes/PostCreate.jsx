import React from 'react'

function PostCreate() {
  return (
    <div className='container'>
        <form>
            <div className='form-group'>
                <label>Title</label>
                <input className='form-control' required/>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default PostCreate