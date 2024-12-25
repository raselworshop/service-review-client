import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials:true,
})

const UseAxiosSecure = () => {
    const { signOutUser } = UseAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        instance.interceptors.response.use(response=>{
            return response
        }, error=>{
            console.log("error cought in interceptors", error)
            if(error.response && (error.response.status === 401 || error.response.status === 403)){
                console.log("You will be redirect to sign in page")
                Swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: `${error.response.data.message||error.message}`,
                    text: 'You will be redirect to sign in page',
                    showConfirmButton: false,
                    timer: 2000
                  });
                signOutUser()
                .then(()=>{
                    console.log("User logged out")
                    navigate('/signin')
                })
                .catch(error=>{
                    console.log("signOut Error: ", error.message)
                })
            }
            return Promise.reject(error)
        })
    },[])

    return instance;
};

export default UseAxiosSecure;