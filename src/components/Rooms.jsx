import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/AuthContext";
import { Alert } from './Alert';
import { useNavigate, Link } from "react-router-dom";

const Rooms = () => {

    const [user, setUser] = useState({ name: "", description: "" })
    const [error, setError] = useState()

    const { createRoom } = useAuth();


    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })

    const navigate = useNavigate();

    const setCreateRoom = async(e) => {
        e.preventDefault()
        

        try {
            setError('Room created')
            await createRoom(user.name, user.description)
            setUser({ name: '', description: '' })
            

            setTimeout(() => {
                navigate("/")
            }, 1000);

        } catch (error) {
            console.log(error.message);
            setError(error.message)
        } 
    }
    return (
        <div className='hero is-fullheight has-background-light backgrounApp'>
            <div className='hero is-small is-primary'>
                <div className="hero-body">
                    <h2 className="title has-text-centered">Create Room</h2>
                </div>
            </div>
            <section className='hero-body is-flex is-justify-content-center'>
                
                <form className="has-background-white p-5 box" onSubmit={setCreateRoom}>
                    <div className="field">
                        <label className='label'>Name</label>
                        <p className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="text"
                                name='name'
                                id='nameRoom'
                                placeholder="Loco por los gatos 😻"
                                onChange={handleChange}/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faPen} />
                            </span>
                            
                        </p>
                    </div>
                    <div className="field">
                        <label className='label'>Desciption</label>
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="textarea"
                                name='description'
                                id='description'
                                placeholder="Soy un loco apasionado ..."
                                onChange={handleChange}/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        {error && <Alert message={error} />}
                    </div>
                    <div className="field">
                        <p className="control ">
                            <button
                                className="button is-success is-medium is-fullwidth "
                                type='submit'>
                                Create
                            </button>
                        </p>
                    </div>
                    <div className="field">
                        <div className="field">
                            <p className="control ">You want to go home<Link to='/'> Home</Link></p>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { Rooms }