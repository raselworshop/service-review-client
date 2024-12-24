import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services/limited')
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            setServices(data)
        })
    },[])

    return (
        <div id='services' className='m-2'>
           <h2 className='text-xl md:text-3xl lg:text-5xl font-semibold my-5 bg-gray-400 py-5 pl-2'>Services for you</h2>
           <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
            {services.map(service=>(
                <ServiceCard key={service._id} service={service}></ServiceCard>
            ))}
           </div> 
           <Link to={'/services'} className='btn btn-outline hover:bg-blue-600 transition-colors'>Browse All Services</Link>
        </div>
    );
};

export default Services;