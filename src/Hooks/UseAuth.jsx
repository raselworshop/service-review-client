import React, { useContext } from 'react';
import AuthContext from '../Provider/AuthContext';

const UseAuth = () => {
    const context = useContext(AuthContext)
    return context;
};

export default UseAuth;