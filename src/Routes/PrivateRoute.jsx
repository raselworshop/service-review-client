import React, { useEffect } from 'react';
import UseAuth from '../Hooks/UseAuth';
import Spinner from '../Component/spinner/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading, setLoading } = UseAuth();
    const location = useLocation();
    useEffect(() => {
        if (!loading) {
            setLoading(false)
        }
    }, [loading, setLoading])
    if (loading) return <Spinner></Spinner>
    if (user) {
        return children;
    }
    return <Navigate to={'/signin'} state={location?.pathname}></Navigate>
};

export default PrivateRoute;