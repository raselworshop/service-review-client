import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const Services = () => {
    const [services, setServices] = useState([]);
 const instanceAxios = UseAxiosSecure();
    useEffect(()=>{
        // fetch('http://localhost:5000/services/limited')
        // .then(res=> res.json())
        // .then(data=>{
        //     console.log(data)
        //     setServices(data)
        // })
       instanceAxios.get(`/services/limited`) 
       .then(res=> setServices(res.data))
    },[])

    return (
        <div id='services' className='m-2'>
           <h2 className='text-3xl font-bold my-6 text-center'>Services for you</h2>
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
            {services.map(service=>(
                <ServiceCard key={service._id} service={service}></ServiceCard>
            ))}
           </div> 
           <Link to={'/services'} className='btn btn-outline hover:btn-primary outline-accent transition-colors'>Browse All Services</Link>
        </div>
    );
};

export default Services;