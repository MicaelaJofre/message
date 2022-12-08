import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/AuthContext";
import { Alert } from './Alert';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateRoom = () => {
    //trae el id ListRoom por el Link
    const location = useLocation()

    const [user, setUser] = useState({ name: "", description: "" })
    const [error, setError] = useState()
    

    const { updateRoom, deleteRoom } = useAuth();

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })


    const navigate = useNavigate()

    const updateRooms = async (e) => {
        e.preventDefault()

        try {

            if (!location.state) throw new Error('Could not find room')
            setError('Room edition')

            await updateRoom(location.state, user.name, user.description)
            setUser({ name: '', description: '' })


            setTimeout(() => {
                navigate("/")
            }, 1000);

        } catch (error) {
            console.log(error.message)
            setError(error.message)
        } 
    }

    const deleteRooms = async () => {
        try {
            if (!location.state) throw new Error('Could not find room')
            setError('Room delete')
            await deleteRoom(location.state)
            navigate("/")

        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

    return (
        <div className='hero is-fullheight has-background-light backgrounApp'>
            <div className='hero is-small is-primary'>
                <div className="hero-body">
                    <h2 className="title has-text-centered">Edit Room</h2>
                </div>
            </div>
            <section className='hero-body is-flex is-justify-content-center'>

                <form className="has-background-white p-5 box" onSubmit={updateRooms}>
                    <div className="field">
                        <label className='label'>Name</label>
                        <p className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="text"
                                name='name'
                                placeholder="New name.."
                                onChange={handleChange} />
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
                                placeholder="New description ..."
                                onChange={handleChange} />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        {error && <Alert message={error} />}
                    </div>
                    <div className="field">
                        <p className="content is-flex is-justify-content-space-evenly">
                            <button
                                className="button is-success "
                                type='submit'>
                                Update
                            </button>
                        <p className="button is-danger ">
                            <button
                                className="button is-danger "
                                type='button'
                                name='delete'
                                onClick={deleteRooms}>
                                Delete
                            </button>    
                        </p>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { UpdateRoom }