import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { useRoom } from "../context/RoomContext";
import { Alert } from './Alert';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateRoom = () => {
    //trae el id ListRoom por el Link
    const location = useLocation()
    
    const [roomData, setRoomData] = useState({ name: "", description: "" })
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [notification, setNotifiation] = useState()
    

    const { updateRoom, deleteRoom } = useRoom();

    const handleChange = ({ target: { name, value } }) => setRoomData({ ...roomData, [name]: value })


    const navigate = useNavigate()

    const updateRooms = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!location.state) throw new Error('Could not find room')
            setNotifiation('Room edition')

            await updateRoom(location.state, roomData.name, roomData.description)
            setRoomData({ name: '', description: '' })


            setTimeout(() => {
                navigate("/")
            }, 1000);

        } catch (error) {
            setError(error.message)

        } finally {
            setLoading(false)
        }
    }

    const deleteRooms = async () => {
        setError('')
        setLoading(true)

        try {
            if (!location.state) throw new Error('Could not find room')
            setError('Room delete')
            await deleteRoom(location.state)
            navigate("/")

        } catch (error) {
            setLoading(false)
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
                                {
                                    loading
                                        ?
                                        <>
                                            <p className='loading'>U</p>
                                            <p className='loading'>p</p>
                                            <p className='loading'>d</p>
                                            <p className='loading'>a</p>
                                            <p className='loading'>t</p>
                                            <p className='loading'>e</p>
                                        </>
                                        : 
                                        <p>Update</p>  
                                }
                            </button>
                        </p>    
                        <p className="controlEditRoom">
                            <button
                                className="buttonEditDelete"
                                type='button'
                                name='delete'
                                onClick={deleteRooms}>
                                {
                                    loading
                                        ?
                                        <>
                                            <p className='loading'>D</p>
                                            <p className='loading'>e</p>
                                            <p className='loading'>l</p>
                                            <p className='loading'>e</p>
                                            <p className='loading'>t</p>
                                            <p className='loading'>e</p>
                                        </>
                                        : 
                                        <p>Delete</p>  
                                }
                            </button>    
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { UpdateRoom }