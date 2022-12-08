import React, { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { Alert } from './Alert';
import { useLocation } from "react-router-dom"
import Avatar from './Avatar';

const ViewRoom = () => {

    const location = useLocation()

    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    
    const { 
        getMessages, 
        setMessagesListener, 
        createMessages, 
        messages, 
        user,
        users
    } = useAuth()

    useEffect(() => {
        getMessages(location.state)
        //deja de leer los mensajes al desmontarse el componente
        return setMessagesListener(null)
    }, [])  
    

    const createMessage = async (e) => {
        e.preventDefault()
        setError('')
        

        try {

            if (!location.state) throw new Error('Could not find room')

            await createMessages(location.state, message)
            await getMessages(location.state)
            setError('Message created')

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            }) 
            
            setMessage('')


        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } 
        
    }


    return (
        <div>
            {!user 
                ? <div className="infoMessage">
                    <div className="container">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                    </div>
                </div>
                : user.photoURL
                    ? <div className='infoMessage'>
                        <img className='photoUser' src={user.photoURL } alt="usuario" />
                        <h1 className='titleMessage has-text-centered'>{user.displayName || user.email}</h1>
                    </div>
                    : <div className='infoMessage'>
                        <img className='photoUser' src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="usuario"/>
                        <h1 className='titleMessage has-text-centered'>{user.displayName || user.email}</h1>
                    </div>        
            }               
            <article className='section'>
            <div className="content">
                <>
                    {
                        messages?.map(message => {
                            return (
                                <article className='messages' key={message.id}>
                                {message.userUid === user.uid 
                                    ?
                                        <div className='containerPhotoUser'>
                                            <Avatar photoURL={ users.find((user) => user.uid === message.userUid)?.photoURL } />
                                        <p>{users.find((user) => user.uid === message.userUid)?.displayName}</p>
                                    </div>
                                    :
                                        <div className='containerPhotoUserOther'>
                                            <Avatar photoURL={ users.find((user) => user.uid === message.userUid)?.photoURL } />
                                        <p>{users.find((user) => user.uid === message.userUid)?.displayName}</p>
                                    </div>
                                }
                                <p 
                                className={message.userUid === user.uid 
                                    ? 'message' 
                                    : 'messageOther' }> 
                                {message.message} 
                                </p>
                                </article>
                            )
                        })                
                    }            
                </>        
            </div>
            </article>
            <section className='send'>
                <form action="" className='formMessage' onSubmit={createMessage}>
                    <div className="control">
                        <textarea
                            name="message"
                            id="message"
                            className='textarea form_textarea'
                            placeholder='Write your message here..'
                            value={message}
                            onChange={({ target }) => setMessage(target.value)}>
                        </textarea>
                    </div>
                    <div className="control">
                        <button
                            type='submit'
                            className='button is-normal has-text-weight-bold buttonHome'>
                            Send
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { ViewRoom }