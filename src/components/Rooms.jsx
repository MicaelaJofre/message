import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons'
import { useRoom } from "../context/RoomContext"
import { Alert } from './Alert';
import { useNavigate, Link } from "react-router-dom"

const Rooms = () => {

    const [user, setUser] = useState({ name: "", description: "" })
    const [error, setError] = useState()

    const { createRoom } = useRoom();


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
        <div className='heroCreateRoom'>
            <div className="createRoomTitle">
                <h2 className="titleCreate">Create Room</h2>
            </div>
            <section className='bodyCreateRoom'>
                <form className="formCreateRoom" onSubmit={setCreateRoom}>
                    <div className="fieldCreateRoom">
                        <label className='labelCreateRoom'>Name</label>
                        <p className="controlCreateRoom">
                            <input
                                className="inputCreateRoom"
                                type="text"
                                name='name'
                                id='nameRoom'
                                placeholder="Crazy for cats 😻"
                                onChange={handleChange}/>
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faPen} />
                            </span>
                            
                        </p>
                    </div>
                    <div className="fieldCreateRoom">
                        <label className='labelCreateRoom'>Desciption</label>
                        <p className="controlCreateRoom">
                            <input
                                className="inputCreateRoom"
                                type="textarea"
                                name='description'
                                id='description'
                                placeholder="Chat exclusively for fans..."
                                onChange={handleChange}/>
                            <span className="iconLeft">
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                        </p>
                    </div>
                    <div className={ error && "notificationAlertOk"}>
                        {error && <Alert message={error} />}
                    </div>
                    <div className="fieldCreateRoom">
                        <p className="controlCreateRoom ">
                            <button
                                className="buttonRoom"
                                type='submit'>
                                Create
                            </button>
                        </p>
                    </div>
                    <div className="containerLinkCreateRoom">
                        <p className="linkCreateRoom">You want to go home<Link to='/'> Home</Link></p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export { Rooms }