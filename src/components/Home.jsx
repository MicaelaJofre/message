import { useRoom } from "../context/RoomContext"
import { ListRooms } from "./ListRooms"
import { NavbarHome } from "./NavbarHome"
import '../css/main.css'

const Home = () => {
    const { loading, room } = useRoom()

    
    if (loading) return <p>Loading...</p>
    
    return (
        <div>
            <NavbarHome/>
            <aside className="contentHome">
                <h1 className="titleHome">List Rooms</h1>
            <div className="contentListHome">
                        {
                            room.map(r => <span key={r.name + r.id}><ListRooms room={r} /> </span>)
                        }
                    </div>
            </aside>
        </div>
    )
}

export { Home }
