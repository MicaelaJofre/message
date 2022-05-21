import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup, 
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext([]);

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //crear usuario
    const singUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

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
    const resetPassword= async (email)=> sendPasswordResetEmail(auth,email)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
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
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}


