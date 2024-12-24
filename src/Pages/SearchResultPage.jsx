import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from '../Component/Shared/ServiceCard';
import Spinner from '../Component/spinner/Spinner';

const SearchResultPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query'); 

    useEffect(() => {
        if (query) {
            setLoading(true);
            axios.get(`${import.meta.env.VITE_API_URL}/services/search?query=${query}`)
                .then(response => {
                    setServices(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch services');
                    setLoading(false);
                });
        }
    }, [query]);

    if (loading) return <Spinner/>;
    if (error) return <div>{error}</div>;

    return (
        <div className='max-w-7xl mx-auto my-5'>
            <h2 className='text-3xl'>Search Results for "{query}"</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5">
                {services.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultPage;
