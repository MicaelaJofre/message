import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const NavbarHome = ({ handleLogaut }) => {

    const { user } = useAuth();

    return (
        <>
            <ul className="menu-list is-flex is-align-items-flex-center ">
                <li className="m-1">
                    <button
                        onClick={handleLogaut}
                        className="button is-normal has-text-weight-bold buttonHome">
                        SingOut
                    </button>
                </li>
                <li className="m-1">
                    <Link to='/rooms'
                        className="button is-normal has-text-weight-bold buttonHome">
                        Create Room
                    </Link>
                </li>
            </ul>
            <ul className="menu-list is-flex is-align-items-flex-start">
                <li className="is-align-self-center has-text-white">Hola
                    <span className="has-text-weight-bold"> {user.displayName || user.email} </span>
                </li>
                {
                    user.photoURL
                    && <li className="photoUser ml-2 "><img src={user.photoURL} alt="usuario" /></li>
                }
            </ul>
        </>
    )
}

export { NavbarHome }