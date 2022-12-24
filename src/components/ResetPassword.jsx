import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { Alert } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const { resetPassword } = useAuth();

    const [user, setUser] = useState({ email: "" });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState()



    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })


    const handleResetPassword = async(e) => {
        e.preventDefault()
        setLoading(true)

        if (!user.email) return setError('Please enter your email')

        try {
            await resetPassword(user.email)
            setNotification('We send you an email whit link to reset your password')

        } catch (error) {
            error.code === 'auth/user-not-found' && setError('Email invalid')
        }
    }


    return (
        <div className='heroLoginSingUpReset'>
            <section className='bodyLoginSingUpReset'>
                <form className="formLoginSingUpReset">
                    <div className="fieldLoginSingUpReset">
                        <p className="controlLoginSingUpReset">
                            <input
                                className="inputLoginSingUpReset"
                                type="email"
                                name='email'
                                id='email'
                                placeholder="Email"
                                onChange={handleChange} />
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </p>
                    </div>
                    <div>
                        <div className={ error && "notificationAlert"}>
                            {error && <Alert message={error} />}    
                        </div>
                        <div className={ notification && "notificationAlertOk"}>
                            {notification && <Alert message={notification} />}
                        </div>
                    </div>
                    <div className="fieldLoginSingUpReset">
                        <p className="controlLoginSingUpReset">
                            <button
                                onClick={handleResetPassword}
                                className=
                                {(!error && loading)
                                    ? "buttonLoginSingUpReset"
                                    : "buttonLoginSingUpReset"}>
                                Send
                            </button>
                        </p>
                    </div>
                    <div className="containerLinkReturn">
                        <p className="linkReturn">
                            <Link to='/login'>⏪ Return</Link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { ResetPassword }