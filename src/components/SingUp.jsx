import React, {useState} from 'react';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Alert } from './Alert';

const SingUp = () => {

    const { singUp } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    
    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await singUp(user.email, user.password)
            navigate("/")
            
        } catch (error) {
            error.code === 'auth/email-already-in-use' && setError('The mail is already in use')
            error.code === 'auth/invalid-email' && setError('Complete the form')
            error.code === 'auth/internal-error' && setError('Email invalid')
            error.code === 'auth/weak-password' && setError('The password must be more than 6 characters')

        } finally {
            setLoading(false)
        }
    }



    return (
        <div className='heroLoginSingUpReset'>
            <section className='bodyLoginSingUpReset'>
                <form className="formLoginSingUpReset" onSubmit={handleSubmit}>
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
                    <div className="fieldLoginSingUpReset">
                        <p className="controlLoginSingUpReset">
                            <input
                                className="inputLoginSingUpReset"
                                type="password"
                                name='password'
                                id='password'
                                placeholder="Password"
                                onChange={handleChange} />
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </p>
                    </div>
                    <div className={ error && "notificationAlert"}>
                        {error && <Alert message={error} />}
                    </div>
                    <div className="fieldLoginSingUpReset">
                        <p className="controlLoginSingUpReset">
                            <button
                                className='buttonLoginSingUpReset'
                                type='submit'>
                                {
                                    loading
                                        ?
                                        <>
                                            <p className='loading'>S</p>
                                            <p className='loading'>i</p>
                                            <p className='loading'>n</p>
                                            <p className='loading'>g</p>
                                            <p className='loading'>U</p>
                                            <p className='loading'>p</p>
                                        </>
                                        : 
                                        <p>SingUp</p>  
                                }
                            </button>
                        </p>
                    </div>
                    <div className="containerLinkSingUp">
                        <p className="linkReturn">Do you already have an account <Link to='/login'>Login</Link></p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { SingUp }