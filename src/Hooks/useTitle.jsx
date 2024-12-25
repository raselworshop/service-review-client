import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

const useTitle = (title) => {
    // const location = useLocation();

    useEffect(()=>{
        document.title = title || 'Services Reviews System'
    },[ title])
};

export default useTitle;