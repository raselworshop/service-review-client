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
        <div className="py-10" ref={statsRef}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Platform Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Users */}
                    <div className="p-6 shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Users</h3>
                        {isVisible && (
                            <CountUp
                                start={0}
                                end={stats.users}
                                duration={2.5}
                                enableScrollSpy
                                suffix='+'
                                // scrollSpyOnce
                                separator=","
                                className="text-4xl font-bold text-blue-500"
                            />
                        )}
                        <p className="text-gray-500 mt-2">Registered Users</p>
                    </div>

                    {/* Total Reviews */}
                    <div className="p-6 shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Reviews</h3>
                        {isVisible && (
                            <CountUp
                                start={0}
                                end={stats.reviews}
                                duration={2.5}
                                separator=","
                                enableScrollSpy
                                suffix='+'
                                // scrollSpyOnce
                                className="text-4xl font-bold text-green-500"
                            />
                        )}
                        <p className="text-gray-500 mt-2">Reviews Posted</p>
                    </div>

                    {/* Total Services */}
                    <div className="p-6 shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold">Services</h3>
                        {isVisible && (
                            <CountUp
                                start={0}
                                end={stats.services}
                                duration={2.5}
                                separator=","
                                suffix='+'
                                enableScrollSpy
                                // scrollSpyOnce
                                className="text-4xl font-bold text-purple-500"
                            />
                        )}
                        <p className="text-gray-500 mt-2">Services Available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformStats;
