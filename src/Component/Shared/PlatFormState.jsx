import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const PlatformStats = () => {
    const statsRef = useRef(null)
    useEffect(()=>{
        if(!statsRef.current){
            console.error("CountUp target not found")
        }
    },[])
    const stats = {
        users: 5000,    // Total users
        reviews: 1200,  // Total reviews
        services: 300   // Total services
    };

    return (
        <div className="bg-gray-100 py-10" ref={statsRef}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Platform Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Total Users */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Users</h3>
                        <CountUp 
                            start={0} 
                            end={stats.users} 
                            duration={2.5} 
                            enableScrollSpy
                            // scrollSpyOnce
                            separator=","
                            className="text-4xl font-bold text-blue-500"
                        />++
                        <p className="text-gray-500 mt-2">Registered Users</p>
                    </div>

                    {/* Total Reviews */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Reviews</h3>
                        <CountUp 
                            start={0} 
                            end={stats.reviews} 
                            duration={2.5} 
                            separator=","
                            enableScrollSpy
                            // scrollSpyOnce
                            className="text-4xl font-bold text-green-500"
                        />++
                        <p className="text-gray-500 mt-2">Reviews Posted</p>
                    </div>

                    {/* Total Services */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Services</h3>
                        <CountUp 
                            start={0} 
                            end={stats.services} 
                            duration={2.5} 
                            separator=","
                            enableScrollSpy
                            // scrollSpyOnce
                            className="text-4xl font-bold text-purple-500"
                        />++
                        <p className="text-gray-500 mt-2">Services Available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformStats;
