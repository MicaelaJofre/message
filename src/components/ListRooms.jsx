import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";




const ListRooms = ({ room }) => {


    const { user } = useAuth()


    return (
        <div className="card is-two-fifths m-5">
            <Link to={{ pathname: '/viewRoom' }} state={room.id}>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{room.name}</p>
                            <p className="subtitle is-6">{room.adminName}</p>
                        </div>
                    </div>
                    <div className="content description">
                        {room.description}
                    </div>
                </div>
            </Link>
                    {
                        user.uid === room.adminUid
                            ? <nav >
                                <Link
                                    className="button is-small"
                                    to={{
                                        pathname: '/updateRoom'
                                    }}
                                    state={room.id}
                                >Edit</Link>
                            </nav>
                            : null
                    }
            
        </div>


    )
}

export { ListRooms }