import React, { useEffect, useState } from 'react';
import UseAuth from '../Hooks/UseAuth';
import Spinner from '../Component/spinner/Spinner';
import ServiceCard from '../Component/Shared/ServiceCard';

const AllServices = () => {
    const { loading, setLoading } = UseAuth();
    const [services, setServices] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:5000/all/services')
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data)
                console.log(data)

            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false)
            }
        };
        fetchAllServices();
    }, [])
    if(loading) return <Spinner/>
    if(error) return <div>Error: {error}</div>
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {services.map(service=> (
                    <ServiceCard key={service._id} service={service}></ServiceCard>
                ))}
            </div>
        </div>
    );
};

export default AllServices;