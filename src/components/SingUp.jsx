import React, {useState} from 'react';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
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
                                    : "button is-success is-medium is-fullwidth mb-2 "}>Singup
                            </button>
                        </p>
                    </div>
                    <div className="field">
                        <p class="control ">Do you already have an account <Link to='/login'>Login</Link></p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { SingUp }