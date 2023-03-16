import React from 'react'

function SubmitButton({button_name}) {
  return (
    <button type='submit' className='btn btn-primary mt-1'>{button_name}</button>
  )
}

export default SubmitButton