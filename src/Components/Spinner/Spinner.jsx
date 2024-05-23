import React from 'react'
import SpinnerImg from '../Assets/Image/SpinnerImg.gif'

export const Spinner = () => {
  return (
    <div>
        <img src={SpinnerImg} alt="spinner not found" className='d-block m-auto' style={{width:"200px"} }></img>
    </div>
  )
}
