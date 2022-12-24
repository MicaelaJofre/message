import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup, 
    sendPasswordResetEmail
} from "firebase/auth";

import { useRoom } from './RoomContext';
import { useMessage } from './MessageContext';

export const AuthContext = createContext([]);
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const { getRooms } = useRoom()
    const { setMessages } = useMessage()

    const createNewUser = ({ displayName, email, photoURL, uid }) => {
        const queryCollection = collection(db, 'Users')
        console.log(queryCollection)
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
    
    //permanecia de la autentificación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser=> {
            setUser(currentUser)
            setLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    

    return (
        <AuthContext.Provider value={{
            singUp,
            login,
            user,
            logout,
            loginGoogle,
            resetPassword,
            users,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}