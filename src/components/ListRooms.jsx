import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";




const ListRooms = ({ room }) => {


    const { user } = useAuth()


    return (
        <div className="containerCard">
            <Link to={{ pathname: '/viewRoom' }} state={room.id}>
            <figure>
                <img className="imgListRoom" src="../img/fondoAnimales.jpg" alt="imagen de sala" />
            </figure>
            <div className="contentCard">
                <div className="cardTitle">
                    <p className="titleRoom">{room.name}</p>
                    <p className="adminCardRoom">{room.adminName}</p>
                </div>
                <div className="cardDescription">
                    {room.description}
                </div>    
                </div>    
            </Link>
                    {
                        user.uid === room.adminUid
                            ? <div className='containerButtonRoom'>
                                <Link
                                    className="cardButton"
                                    to={{
                                        pathname: '/updateRoom'
                                    }}
                                    state={room.id}
                                >Edit</Link>
                            </div>
                            : null
                    }
            
        </div>


    )
}

export { ListRooms }