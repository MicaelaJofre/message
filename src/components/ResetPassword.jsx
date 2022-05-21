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

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })

    const handleResetPassword = async(e) => {
        e.preventDefault()
        if (!user.email) return setError('Please enter your email')
        try {
            await resetPassword(user.email)
            setError('We send you an email whit link to reset your password')
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div className='hero is-fullheight has-background-light backgrounApp'>
            <section className='hero-body is-flex is-justify-content-center'>
                <form className="has-background-white p-5 box">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="email"
                                name='email'
                                id='email'
                                placeholder="Email"
                                onChange={handleChange} />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <span className="icon is-small is-right">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        {error && <Alert message={error} />}
                    </div>
                    <div className="field">
                        <p className="control ">
                            <button onClick={handleResetPassword} class="button is-success is-medium is-fullwidth mb-2">
                                Send
                            </button>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control ">
                            <Link to='/login'>⏪ Return</Link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { ResetPassword }