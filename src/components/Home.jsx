import { useAuth } from "../context/AuthContext";
import { ListRooms } from "./ListRooms";
import { NavbarHome } from "./NavbarHome";
import '../css/main.css';

const Home = () => {

    const {  logout, loading, room } = useAuth();


    

    const handleLogaut = async () => {
        await logout()
    }

    if (loading) return <p>Loading...</p>
    
    return (
        <div className={room.length > 0 ? "content backgrounApp-active" : "content backgrounApp"}>
            <aside className="menu has-background-primary p-3 is-flex is-align-items-center is-justify-content-space-between">
                <NavbarHome handleLogaut={handleLogaut}/>
            </aside>

            <aside className="colums">
                <div className="section">
                    <div className="container is-flex is-flex-wrap-wrap">
                        {
                            room.map(r => <span key={r.name + r.id}><ListRooms room={r} /> </span>)
                        }
                    </div>
                </div>
            </aside>
        </div>
    )
}

export { Home }
