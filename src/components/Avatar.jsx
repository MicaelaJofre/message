import React from 'react'

const Avatar = ({ photoURL }) => {
  return (
    <img className='imgMessage' src={ photoURL } referrerPolicy="no-referrer" alt="usuario" />
  )
}

export default Avatar