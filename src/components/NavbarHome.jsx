import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

const NavbarHome = () => {
    const { logout, user } = useAuth()

    return (
        user ? (
            <aside className="menu">
                <Link to='/'
                    className="imgMenu">
                    <img className='imgLogo' src="../img/ring.png" alt="logo"/>
                </Link>
                <ul className="menuList">
                    <li className="menuListButon">
                        <button
                            onClick={() => logout()}
                            className="buttonSingUpMenu">
                            SingOut
                        </button>
                    </li>
                    <li className="menuListButon">
                        <Link to='/rooms'
                            className="buttonCreateRoom">
                            Create Room
                        </Link>
                    </li>
                </ul>
                <ul className="menuListUser">
                    <li>
                        Hola
                        <span className="nameUser"> {user.displayName || user.email}! </span>
                    </li>
                    {
                        user.photoURL
                        && <li>
                            <img className='photoUser' src={user.photoURL || ''} referrerPolicy="no-referrer" alt="usuario" />
                            </li>
                    }
                </ul>
            </aside>
        ) :
            null
    )
}

export { NavbarHome }