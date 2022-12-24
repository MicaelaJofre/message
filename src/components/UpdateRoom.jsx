import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { useRoom } from "../context/RoomContext";
import { Alert } from './Alert';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateRoom = () => {
    //trae el id ListRoom por el Link
    const location = useLocation()

    const [user, setUser] = useState({ name: "", description: "" })
    const [error, setError] = useState()
    const [notification, setNotifiation] = useState()
    

    const { updateRoom, deleteRoom } = useRoom();

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value })


    const navigate = useNavigate()

    const updateRooms = async (e) => {
        e.preventDefault()

        try {

            if (!location.state) throw new Error('Could not find room')
            setNotifiation('Room edition')

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
        <div className='heroEditRoom'>
            <div className='editRoomTitle'>
                <h2 className="titleEdit">Edit Room</h2>
            </div>
            <section className='bodyEditRoom'>
                <form className="formEditRoom" onSubmit={updateRooms}>
                    <div className="fieldEditRoom">
                        <label className='labelEditRoom'>Name</label>
                        <p className="controlEditRoom">
                            <input
                                className="inputEditRoom"
                                type="text"
                                name='name'
                                placeholder="New name.."
                                onChange={handleChange} />
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faPen} />
                            </span>
                        </p>
                    </div>
                    <div className="fieldEditRoom">
                        <label className='labelEditRoom'>Desciption</label>
                        <p className="controlEditRoom">
                            <input
                                className="inputEditRoom"
                                type="textarea"
                                name='description'
                                placeholder="New description ..."
                                onChange={handleChange} />
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faBook} />
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
                    <div className="fieldEditRoom">
                        <p className="controlEditRoom">
                            <button
                                className="buttonEditUpdate"
                                type='submit'>
                                Update
                            </button>
                        </p>    
                        <p className="controlEditRoom">
                            <button
                                className="buttonEditDelete"
                                type='button'
                                name='delete'
                                onClick={deleteRooms}>
                                Delete
                            </button>    
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { UpdateRoom }