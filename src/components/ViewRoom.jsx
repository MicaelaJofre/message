import React, { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { useRoom } from '../context/RoomContext'
import { useMessage } from '../context/MessageContext'
import { Alert } from './Alert'
import { useLocation } from "react-router-dom"
import Avatar from './Avatar'
import { NavbarHome } from './NavbarHome'

const ViewRoom = () => {
    const location = useLocation()

    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    
    const { user, users } = useAuth()
    const { room } = useRoom()

    const { getMessages, createMessages,  messages } = useMessage()

    useEffect(() => {
        getMessages(location.state)
    }, [location.state])  
    
    useEffect(() => {
        if (!messages.length === 0) return
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        }) 
    }, [messages])




    const createMessage = async (e) => {
        e.preventDefault()
        setError('')
        
        try {
            if (!location.state) throw new Error('Could not find room')

            await createMessages(location.state, message)
            await getMessages(location.state)
            setError('Message created')
            
            setMessage('')
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } 
        
    }


    return (
        <div className='messageContainer'>
            <NavbarHome />
            <div className="roomName">
                <span>Room  </span>
                <span>"{room && room.find((room) => room.id === location.state)?.name}"</span>
            </div>
            <article className='contentUserMessage'>
                {
                    messages?.map(message => {
                        return (
                            <article className='messages' key={message.id}>
                                {message.userUid === user.uid 
                                    ?
                                    <div className='containerPhotoUser'>
                                        <p className={message.userUid === user.uid 
                                            ? 'message' 
                                            : 'messageOther' }> 
                                            {message.message}
                                        </p>
                                        <Avatar 
                                        photoURL={ users.find((user) => user.uid === message.userUid)?.photoURL }/>
                                    </div>
                                    :
                                    <div className='containerPhotoUserOther'>
                                        <Avatar 
                                                photoURL={ users.find((user) => user.uid === message.userUid)?.photoURL }/>
                                            <p className={message.userUid === user.uid 
                                                ? 'message' 
                                                : 'messageOther' }> 
                                                {message.message}
                                            </p>    
                                    </div>
                                }
                                    
                            </article>
                        )
                    })                        
                }   
            </article>
            <section className='send'>
                <form action="" className='formMessage' onSubmit={createMessage}>
                    <div className="controlTextarea">
                        <textarea
                            name="message"
                            id="message"
                            className='textarea'
                            placeholder='Write your message here..'
                            value={message}
                            onChange={({ target }) => setMessage(target.value)}>
                        </textarea>
                    </div>
                    <div className="controlButtonViewRoom">
                        <button
                            type='submit'
                            className='buttonViewRoom'>
                            Send
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { ViewRoom }