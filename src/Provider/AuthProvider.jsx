import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,
     signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile 
    } from 'firebase/auth';
import  { useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import AuthContext from './AuthContext';
import Spinner from '../Component/spinner/Spinner';
import axios from 'axios';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // const instanceAxios = UseAxiosSecure();
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signinWithPop = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile =(name, photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:photo
        })
    }

    const signOutUser = async()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            // console.log("state captured",currentUser?.email)
            if(currentUser?.email){
                const user = {email: currentUser?.email}
                axios.post(`${import.meta.env.VITE_PROD_API_URL}/jwt`, user,{withCredentials: true})
                // instanceAxios.post(`/jwt`, user)
                .then(res=>{
                    // console.log("Login token",res.data)
                })
            }else{
                axios.post(`${import.meta.env.VITE_PROD_API_URL}/signout`, {}, {withCredentials:true})
                // instanceAxios.post(`/signout`, {} )
                .then(res=>{
                    // console.log("Log Out Success", res.data)
                })
            }
            setLoading(false)
        })
        return ()=>{
            return unsubscribe();
        }
    },[])
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        signinWithPop,
        updateUserProfile,
        signOutUser,
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;