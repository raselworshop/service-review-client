import React from 'react';

const WhyChoose = () => {
    return (
        <section className=" bg-blue-100 py-10  rounded-md">
            <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us</h2>
            <div className="flex flex-wrap justify-center gap-10 px-4">
                <div className="flex flex-col items-center">
                    <img src="/path-to-icon1.png" alt="User-Friendly" className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
                    <p className="text-gray-600 text-center">Easily browse and find the services you need.</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/path-to-icon2.png" alt="Trusted Reviews" className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">Trusted Reviews</h3>
                    <p className="text-gray-600 text-center">Get reliable reviews from real users.</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/path-to-icon3.png" alt="Verified Services" className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">Verified Services</h3>
                    <p className="text-gray-600 text-center">Only top-notch and verified services available.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;