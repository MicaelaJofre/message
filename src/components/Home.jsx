    import { useAuth } from "../context/AuthContext";
    import '../css/main.css';

    const Home = () => {

        const { user, logout, loading } = useAuth();

        const handleLogaut = async() => {
            await logout()
        }

        if(loading) return <p>Loading...</p>

        return (
            <div className="content backgrounApp">
                <aside className="menu has-background-primary p-3 is-flex is-align-items-center is-justify-content-space-between">
                    <ul className="menu-list">
                        <li>
                            <button onClick={handleLogaut} className="button is-normal has-text-weight-bold buttonHome">
                                SingOut
                            </button>
                        </li>
                    </ul>
                    <ul className="menu-list is-flex is-align-items-flex-start">
                        <li className="is-align-self-center has-text-white">Hola <span className="has-text-weight-bold">{user.displayName || user.email}</span></li>
                        <li className="photoUser ml-2 "><img src={user.photoURL} alt="usuario" /></li>
                    </ul>
                </aside>
            </div>
        )
    }

    export { Home }
