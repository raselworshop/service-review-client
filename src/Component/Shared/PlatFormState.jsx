import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';


const PlatformStats = () => {
    const [isVisible, setIsVisible] = useState(false)

    const statsRef = useRef(null)
    useEffect(() => {
        const handleScroll = () => {
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    setIsVisible(true)
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const stats = {
        users: 5000,    // Total users
        reviews: 1200,  // Total reviews
        services: 300   // Total services
    };

    return (
        <div className="max-w-7xl mx-auto" ref={statsRef}>
            <div className="text-center">
                <h2 className="text-3xl font-bold my-6">Platform Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="relative p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-xl overflow-hidden transform transition duration-500 hover:scale-105">
                            <h3 className="text-2xl font-semibold capitalize">{key}</h3>
                            {isVisible && (
                                <CountUp
                                    start={0}
                                    end={value}
                                    duration={2.5}
                                    separator=","  
                                    suffix="+"
                                    className="text-5xl font-extrabold mt-2"
                                />
                            )}
                            <p className="mt-2 text-lg opacity-80">
                                {key === 'users' ? 'Registered Users' : key === 'reviews' ? 'Reviews Posted' : 'Services Available'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlatformStats;
