import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Spinner from "../../spinner/Spinner";

const partners = [
    { id: 1, name: "Partner A", logo: "https://i.ibb.co/PG8P20D/people-shaking-hands.jpg" },
    { id: 2, name: "Partner B", logo: "https://i.ibb.co/s6ndnFm/business-briefing-diversity-presenting-showing.jpg" },
    { id: 3, name: "Partner C", logo: "https://i.ibb.co/7RH478R/working-meeting-asian-colleagues.jpg" },
    { id: 4, name: "Partner D", logo: "https://i.ibb.co/c1pbLTy/aalal.jpg" },
    { id: 5, name: "Partner E", logo: "https://i.ibb.co/yPqSVqD/62861.jpg" },
    { id: 6, name: "Partner F", logo: "https://i.ibb.co/58wNVqM/rb-62868.png" },
];

const MeetOurPartners = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [partnersData, setPartnersData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setPartnersData(partners);
            setLoading(false);
        }, 1500);
    }, []);

    const handlePartner = () => {
        navigate('/partner-program');
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <section>
            <h2 className="text-3xl font-bold my-6 text-center">Meet Our Partners</h2>
            
            {/* Marquee Wrapper */}
            <div className="overflow-hidden">
                <Marquee pauseOnHover={true} speed={50} gradient={true} gradientWidth={50}>
                    <div className="flex gap-6">
                        {partnersData.map((partner) => (
                            <div key={partner.id} className="flex flex-col items-center shadow-lg p-4 rounded-lg bg-white w-[120px]">
                                <img src={partner.logo} alt={partner.name} className="w-20 h-20 object-contain mb-2" />
                                <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>

            <div className="text-center mt-6">
                <button className="btn btn-accent hover:btn-primary" onClick={handlePartner}>
                    Explore All Partners
                </button>
            </div>
        </section>
    );
};

export default MeetOurPartners;
