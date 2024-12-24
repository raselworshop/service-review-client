import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const partners = [
    { id: 1, name: "Partner A", logo: "https://i.ibb.co/PG8P20D/people-shaking-hands.jpg", description: "Leading provider in tech solutions." },
    { id: 2, name: "Partner B", logo: "https://i.ibb.co/s6ndnFm/business-briefing-diversity-presenting-showing.jpg", description: "Expert in logistics and supply chain." },
    { id: 3, name: "Partner C", logo: "https://i.ibb.co/7RH478R/working-meeting-asian-colleagues.jpg", description: "Global leader in marketing services." },
    { id: 4, name: "Partner D", logo: "https://i.ibb.co/c1pbLTy/aalal.jpg", description: "Global leader in marketing services." },
    { id: 5, name: "Partner E", logo: "https://i.ibb.co/yPqSVqD/62861.jpg", description: "Global leader in marketing services." },
    { id: 6, name: "Partner F", logo: "https://i.ibb.co/58wNVqM/rb-62868.png", description: "Global leader in marketing services." },
];

const MeetOurPartners = () => {
    const navigate = useNavigate(); 
    const handlePartner = () =>{
        navigate('/partner-program')
    }
    const extendedPartners = [...partners, ...partners];

    return (
        <section className="py-10 bg-gray-100 my-8">
            <h2 className="text-3xl font-bold text-center mb-6">Meet Our Partners</h2>
            <div className="overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    initial={{ x: 0 }}
                    animate={{ x: -(partners.length * 50) }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                >
                    {extendedPartners.map((partner, index) => (
                        <motion.div
                            key={`${partner.id}-${index}`}
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center bg-white shadow-lg p-4 rounded-lg"
                            style={{ width: "120px" }}
                        >
                            <img src={partner.logo} alt={partner.name} className="w-20 h-20 object-contain mb-2" />
                            <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="text-center mt-6">
                <button className="btn btn-secondary btn-outline" onClick={handlePartner}>
                    Explore All Partners
                </button>
            </div>
        </section>
    );
};

export default MeetOurPartners;
