import React from 'react';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { FaCheckCircle, FaHandHoldingHeart } from 'react-icons/fa';

const WhyChoose = () => {
    return (
        <section className="rounded-md">
            <h2 className="text-3xl font-bold my-6 text-center">Why Choose Us</h2>
            <div className="flex flex-wrap justify-center gap-10 px-4">
                <div className="flex flex-col items-center">
                    <FaHandHoldingHeart className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
                    <p className="text-center">Easily browse and find the services you need.</p>
                </div>
                <div className="flex flex-col items-center">
                <AiOutlineSafetyCertificate className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">Trusted Reviews</h3>
                    <p className="text-center">Get reliable reviews from real users.</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaCheckCircle className="h-16 w-16 mb-4" />
                    <h3 className="text-xl font-semibold">Verified Services</h3>
                    <p className="text-center">Only top-notch and verified services available.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;