import React from 'react'

const Avatar = ({ photoURL }) => {
  return (
    <img className='imgMessage' src={ photoURL } alt="usuario" />
  )
}

export default Avatar