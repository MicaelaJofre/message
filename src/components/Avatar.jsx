import React from 'react'

const Avatar = ({ photoURL }) => {
  return (
    <img className='imgMessage' src={ photoURL } referrerpolicy="no-referrer" alt="usuario" />
  )
}

export default Avatar