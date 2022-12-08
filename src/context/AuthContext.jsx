import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import { auth } from "../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup, 
    sendPasswordResetEmail
} from "firebase/auth";
import {
    addDoc,
    collection,
    orderBy,
    getFirestore,
    onSnapshot, 
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';


export const AuthContext = createContext([]);

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const createNewUser = ({ displayName, email, photoURL, uid }) => {
        const queryCollection = collection(db, 'Users')
        const names = ["Foca", "Perro", "Gato", "Carpincho", "Pato", "Ornitorrinco"]
        addDoc(queryCollection, {
            displayName: displayName || names[Math.floor(Math.random() * names.length)],
            email,
            photoURL: photoURL || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            uid,
        })
    }

    //crear usuario
    const singUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                createNewUser(user)
            })
    }

    //verificar usuario     
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    //cerrar usuario
    const logout = () => signOut(auth);

    //login con google
    const loginGoogle = async () => {
        console.log("here")
        try {
            const provider = new GoogleAuthProvider()
            return signInWithPopup(auth, provider).then(({ user }) => {
                createNewUser(user)
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    //reset password
    const resetPassword = async (email) => await sendPasswordResetEmail(auth, email)

    const getAllUsers = () => {
        const usersList = []
        const query = collection(db, 'Users')
        onSnapshot(query, querySnapshop => {
            querySnapshop.forEach((doc) => {
                const user = doc.data()
                usersList.push(user)
            })
        })
        setUsers(usersList)
    }

    useEffect(() => {
        getAllUsers()
    }, [])


    ////////////rooms///////////////////

    //guarda room creadas en el roomcontext
    const [room, setRoom] = useState([])
    const [roomsListener, setRoomsListener] = useState(null)
    
    const db = getFirestore();

    // creamos el room
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
    
    //llamamos al room para mostrarlas en el home
    const getRooms = () => {
        
        let roomData = []
        const query = collection(db, 'Rooms')
        orderBy("createdAt", "desc")

        //desuscribirse en el caso de no estar autentificados
        setRoomsListener(query ? query : null)


        onSnapshot(query, querySnapshop => {
            setLoading(true)
            querySnapshop.docChanges().forEach(change => {
                //agregamos nueva room
                if (change.type === "added") {
                    let room = change.doc.data()
                    room.id = change.doc.id
                    roomData.unshift(room)
                }
                //modificamos room
                if (change.type === "modified") {
                    let room = change.doc.data()
                    room.id = change.doc.id
                    let index = change.newIndex
                    roomData[index] = (room)
                }
                //eliminamos room
                if (change.type === "removed") {
                    let index = change.oldIndex
                    roomData.splice(index, 1)
                }
            });
            setRoom(roomData)
            setLoading(false)
        })

    }

    

    //editamos el room

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

    //eliminamos el room

    const deleteRoom = async (id) => {
        const queryCollection = doc(db, 'Rooms', id)
        const queryCollectionMessages = collection(db, 'Rooms', id, 'messages')

        await deleteDoc(queryCollection)
            
        onSnapshot(queryCollectionMessages, querySnapshop => {
            querySnapshop.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            })
        })
        setMessages([])
    }

    useEffect(() => {
        getRooms()
    }, [room])
    

    ////////////////////////////////////////////////
    
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
    const [messagesListener, setMessagesListener] = useState(null)

    const getMessages = async (id) => {

        const query = collection(db, 'Rooms', id, 'messages')
        orderBy("createdAt")
        
        //dejar de ver los mensajes en el caso de no estar en el room
        setMessagesListener(query ? query : null)
        
        
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


    //////////////////////////////////////////////
    
    //permanecia de la autentificación
    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, currentUser=> {
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                getRooms()
            }
            else {
                setRoom([]) 
                setRoomsListener(null)
                setMessages([])
                setMessagesListener(null)
            } 
        })
        
        return () => unsubscribe();
    }, [])

    

    return (
        <AuthContext.Provider value={{
            singUp,
            login,
            user,
            loading,
            logout,
            loginGoogle,
            resetPassword,
            setRoom,
            room,
            createRoom,
            updateRoom,
            getMessages,
            createMessages,
            setMessagesListener, 
            messages,
            users,
            deleteRoom
        }}>
            {children}
        </AuthContext.Provider>
    )
}


