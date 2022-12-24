import { createContext, useContext, useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { collection, addDoc, orderBy, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

export const RoomContext = createContext([]);
export const useRoom = () => useContext(RoomContext)

export const RoomProvider = ({children}) => {
    const [room, setRoom] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()

    useEffect(() => user ? getRooms() : setRoom([]), [user]) // eslint-disable-line
    useEffect(() => getRooms(), [room]) // eslint-disable-line


    const createRoom = (name, description) => {
        const queryCollection = collection(db, 'Rooms')

        addDoc(queryCollection, {
            name,
            description,
            createdAt: Date.now(),
            adminUid: user.uid,
            adminName: user.displayName
        })
    }

    const getRooms = () => {
        if(room.length > 0) return
        let roomData = []
        const query = collection(db, 'Rooms')
        orderBy("createdAt", "desc")

        onSnapshot(query, querySnapshop => {
            setLoading(true)      
            querySnapshop.docChanges().forEach(change => {
                if (change.type === "added") {
                    let room = change.doc.data()
                    room.id = change.doc.id
                    roomData.unshift(room)
                }
                if (change.type === "modified") {
                    let room = change.doc.data()
                    room.id = change.doc.id
                    let index = change.newIndex
                    roomData[index] = (room)
                }
                if (change.type === "removed") {
                    let index = change.oldIndex
                    roomData.splice(index, 1)
                }
            });
            setRoom(roomData)
            setLoading(false)
        })
    }

    const updateRoom = async (id, name, description) => {
        const roomDate = {}

        if (room.find(r => r.id === id)?.adminUid !== user.uid) throw new Error('user not valid')
        if (name) roomDate.name = name
        if (description) roomDate.description = description

        const queryCollection = doc(db, 'Rooms', id)
        try {
            await updateDoc(queryCollection, roomDate)
        } catch (error) {
            console.error(error.message);
        }
    }


    const deleteRoom = async (id) => {
        const queryCollection = doc(db, 'Rooms', id)
        const queryCollectionMessages = collection(db, 'Rooms', id, 'messages')

        await deleteDoc(queryCollection)

        onSnapshot(queryCollectionMessages, querySnapshop => {
            querySnapshop.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
        })
    }

    return (
        <RoomContext.Provider value={{
            room,
            createRoom,
            updateRoom,
            deleteRoom,
            loading,
            setLoading
        }}>
            {children}
        </RoomContext.Provider>
    )
}

