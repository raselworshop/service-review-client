import React, { useContext } from 'react';
import AuthContext from '../Provider/AuthContext';

const UseAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('UseAuth must be used within an AuthProvider');
    }
    return context;
};

export default UseAuth;