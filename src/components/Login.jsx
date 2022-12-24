import React, { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import { Alert } from './Alert'

const Login = () => {
    
    const navigate = useNavigate();
    const { login, loginGoogle } = useAuth();

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        
        try {
            await login(user.email, user.password)
            navigate("/")

        } catch (error) {
            setLoading(false)
            error.code === 'auth/wrong-password' && setError('Password invalid')
            error.code === 'auth/user-not-found' && setError('User invalid')
            error.code === 'auth/invalid-email' && setError('Complete the form')
            error.code === 'auth/internal-error' && setError('Enter the password')
        }
    }

    //google
    const handleGoogle = async() => {
        try {
            await loginGoogle()
            navigate("/")
        } catch (error) {
            setLoading(false)
            setError("Can't connect with your gmail user")
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
                                onChange={handleChange}/>  
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
                                className="buttonLoginSingUpReset">
                                {
                                    loading
                                    ?
                                    <>
                                        <p className='loading'>L</p>
                                        <p className='loading'>o</p>
                                        <p className='loading'>g</p>
                                        <p className='loading'>i</p>
                                        <p className='loading'>n</p>
                                    </>
                                    : 
                                    <p>Login</p>
                                }
                            </button>
                            <button
                                onClick={handleGoogle}
                                className= "buttonLoginGoogle">
                                {
                                    loading 
                                    ? <>
                                    <p className='loading'>L</p>
                                    <p className='loading'>o</p>
                                    <p className='loading'>g</p>
                                    <p className='loading'>i</p>
                                    <p className='loading'>n </p>
                                    <p className='loading'>w</p>
                                    <p className='loading'>h</p>
                                    <p className='loading'>i</p>
                                    <p className='loading'>t</p>
                                    <p className='loading'>h </p>
                                    <p className='loading'>G</p>
                                    <p className='loading'>o</p>
                                    <p className='loading'>o</p>
                                    <p className='loading'>g</p>
                                    <p className='loading'>l</p>
                                    <p className='loading'>e</p>
                                    <p className='loading'> 🚀</p>
                                    </>
                                    : 
                                    <p>Login whith Google 🚀</p>
                                }                                
                            </button>
                        </p>
                    </div>
                    <div className="containerLink">
                        <p className ="linkLoginSingUp">You do not have an account<Link to='/singUp'> SingUp</Link></p>
                    </div>
                    <div className="containerLinkLogin">
                        <p className="linkLoginresetPassword"><Link to='/resetPassword'> Forgot Password?</Link></p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { Login }