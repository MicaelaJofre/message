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
    updateDoc
} from 'firebase/firestore';


export const AuthContext = createContext([]);

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    
    
    //crear usuario
    const singUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);//updateProfile agregar name

    //verificar usuario     
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    //cerrar usuario
    const logout = () => signOut(auth);

    //login con google
    const loginGoogle = async() => {
        try {
            const provider = new GoogleAuthProvider()
            return await signInWithPopup(auth, provider)
        } catch (error) {
            console.log(error.message);
        }
    }

    //reset password
    const resetPassword = async (email) => await sendPasswordResetEmail(auth, email)
    

    ////////////rooms///////////////////

    //guarda room creadas en el roomcontext
    const [room, setRoom] = useState([])
    const [roomsListener, setRoomsListener] = useState(null)
    
    const db = getFirestore();

    // creamos el room
    const createRoom = (name, description) => {

        const queryCollection =  collection(db, 'Rooms')

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
            console.log(roomData);
            setRoom(roomData)
            setLoading(false)
        })

        /* const query = collection(db, 'Rooms')
        orderBy("createdAt", "desc")
        onSnapshot(query, querySnapshop => {

            const rooms = []
            setLoading(true)
            querySnapshop.forEach(doc => {
                let room = doc.data()
                room.id = doc.id
                rooms.push(room)
            });
            setLoading(false)
            setRoom(rooms)
        }) */
    }

    

    //editamos el room

    const updateRoom = async(id, name, description) => {
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
            updateRoom
        }}>
            {children}
        </AuthContext.Provider>
    )
}


