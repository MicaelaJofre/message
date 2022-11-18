import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Alert } from './Alert';

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
            setError("Can't connect with your gmail user")
        }
    }
    


    return (
        <div className='hero is-fullheight has-background-light backgrounApp'>
            <section className='hero-body is-flex is-justify-content-center'>
                <form className="has-background-white p-5 box" onSubmit={handleSubmit}>
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
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                name='password'
                                id='password'
                                placeholder="Password"
                                onChange={handleChange} />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        {error && <Alert message={error} />}
                    </div>
                    <div className="field">
                        <p className="control ">
                            <button
                                className=
                                {(!error && loading)
                                    ? "button is-success is-medium is-fullwidth mb-2 is-loading"
                                    : "button is-success is-medium is-fullwidth mb-2 "}>
                                Login
                            </button>
                            <button
                                onClick={handleGoogle}
                                className=
                                {(!error && loading)
                                    ? "button is-danger is-medium is-fullwidth is-loading"
                                    : "button is-danger is-medium is-fullwidth"}>
                                Login whith Google 🚀
                            </button>
                        </p>
                    </div>
                    <div className="field">
                        <p className ="control ">You do not have an account<Link to='/singUp'> SingUp</Link></p>
                    </div>
                    <div className="field has-text-centered">
                        <p className="control "><Link to='/resetPassword'> Forgot Password?</Link></p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { Login }