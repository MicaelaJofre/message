import { createContext, useState, useContext, useEffect } from "react"
import { addDoc, orderBy, collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

export const MessageContext = createContext([]);
export const useMessage = () => useContext(MessageContext)

export const MessageProvider = ({ children }) => {
    const { user } = useAuth()

    useEffect(() =>  setMessages([]), [user])
    
    //Enviar mensajes
    const createMessages = async (id, message) => {
        const query = collection(db, 'Rooms', id, 'messages')
        await addDoc(query, {
            userUid: user.uid,
            adminName: user.displayName,
            message,
            createdAt: Date.now()
        })
    }
    //Mostrar mensajes
    const [messages, setMessages] = useState([])

    const getMessages = async (id) => {

        const query = collection(db, 'Rooms', id, 'messages')
        orderBy("createdAt")

        onSnapshot(query, querySnapshop => {
            let dataMessage = []
            querySnapshop.forEach(doc => {
                let message = doc.data()
                message.id = doc.id
                dataMessage.unshift(message)
            })

            setMessages(dataMessage.sort((a, b) => a.createdAt - b.createdAt))
        })
    }

    return (
        <MessageContext.Provider value={{
            getMessages,
            createMessages,
            messages
        }}>
            {children}
        </MessageContext.Provider>
    )
}