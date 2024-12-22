import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,
     signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile 
    } from 'firebase/auth';
import  { useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import AuthContext from './AuthContext';
import Spinner from '../Component/spinner/Spinner';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
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
            console.log(currentUser)
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