import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { FaCloud } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Partners = () => {
    const statsRef = useRef(null)
    useEffect(() => {
        if (!statsRef.current) {
            // console.error("CountUp target not found")
        }
    }, [])
    const stats = {
        domains: 5000,    // Total domains
        reviews: 1200,  // Total reviews
        services: 300   // Total services
    };
    const handleProve = () => {
        Swal.fire({
            title: "You are most welcome",
            text: "We are glad to see in our partnership program!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Thank you"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "We got you!",
                    text: "We will be with you.",
                    icon: "success"
                });
            }
        })
    }

    const handlereadMore=()=>{
        Swal.fire({
            title: "We got you!",
            text: "We will be with you.",
            icon: "success"
        });
    }

    return (
        <div className='container mx-auto'>
            <h2 className='my-4 text-3xl lg:text-5xl font-semibold'>Meet Our Partner Program</h2>
            <div className='md:flex items-center justify-between'>
                <div className='p-10 flex flex-col items-center flex-1'>
                    <h3 className='text-2xl lg:text-4xl my-3 font-semibold'>Partners Relations</h3>
                    <p>Our Vison is to be the Universal Sign of Truth</p>
                    <button className='btn btn-accent hover:btn-primary  my-3 w-3/4' onClick={handleProve}>
                        Prove To Show
                    </button>
                </div>
                <div className='flex-1'>
                    <span><FaCloud className='text-green-700 text-9xl' /> </span>
                    <img className='' src={"https://i.ibb.co/PG8P20D/people-shaking-hands.jpg"} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Users */}
                <div className="p-6 shadow-lg rounded-lg" ref={statsRef}>
                    <CountUp
                        start={0}
                        end={stats.domains}
                        duration={2.5}
                        enableScrollSpy
                        suffix='b+'
                        // scrollSpyOnce
                        separator=","
                        className="text-4xl font-bold text-blue-500"
                    />
                    <h3 className="text-2xl font-semibold my-3">Domains</h3>
                    <p>Seamlessly monetize enterprise niches via 24/7 opportunities. Objectively exploit go forward opportunities via web-enabled value. Proactively orchestrate out-of-the-box synergy after bleeding-edge communities. Dynamically administrate sticky expertise rather than impactful partnerships. Interactively embrace out-of-the-box niches vis-a-vis open-source paradigms.
                        Phosfluorescently productivate visionary manufactured products and resource-leveling "outside the box" thinking. Progressively target 2.0 systems through long-term.</p>
                </div>

                {/* Total Reviews */}
                <div className="p-6 shadow-lg rounded-lg">
                    <CountUp
                        start={0}
                        end={stats.reviews}
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        suffix='m+'
                        // scrollSpyOnce
                        className="text-4xl font-bold text-green-500"
                    />
                    <h3 className="text-2xl font-semibold my-3">Reviews</h3>
                    <p>Reviews Posted</p>
                    <p>Conveniently cultivate transparent scenarios through B2C niche markets. Competently harness synergistic outsourcing after world-class infomediaries. Progressively provide access to parallel e-markets before exceptional strategic theme areas. Objectively orchestrate quality innovation whereas flexible growth strategies. Enthusiastically engineer diverse deliverables for prospective best practices.Completely facilitate leveraged opportunities vis-a-vis web-enabled functionalities. Phosfluorescently syndicate adaptive results through.</p>
                </div>

                {/* Total Services */}
                <div className="p-6 shadow-lg rounded-lg">
                    <CountUp
                        start={0}
                        end={stats.services}
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        suffix='k+'
                        // scrollSpyOnce
                        className="text-4xl font-bold text-purple-500"
                    />
                    <h3 className="text-2xl font-semibold mt-3">Services</h3>
                    <p>Services Available</p>
                    <p>Credibly unleash B2B bandwidth without cross-unit infrastructures. Globally administrate bricks-and-clicks best practices through magnetic best practices. Objectively create bleeding-edge action items without integrated potentialities. Collaboratively incentivize user-centric supply chains before B2C users. Professionally harness exceptional core competencies rather than high standards in markets.

                        Enthusiastically reinvent accurate materials whereas enterprise alignments. Collaboratively disintermediate multifunctional quality.</p>
                </div>
            </div>
            <section className="flex flex-col lg:flex-row items-center justify-between py-10">
                <div className="max-w-lg px-4">
                    <h2 className="text-3xl font-bold mb-4">A purpose-driven business</h2>
                    <p className="mb-6"> "Our vision is to become the universal symbol of trust, empowering consumers to make confident, informed buying decisions while allowing businesses to credibly signal the quality of their services and to gain actionable insights to improve them."
                    </p>
                    <button onClick={handlereadMore} className="btn btn-accent hover:btn-primary">Read more</button>
                </div>
                <div className="relative w-full h-64 lg:w-1/2 lg:h-auto px-4 mt-8 lg:mt-0">
                    <img src="https://i.ibb.co/7RH478R/working-meeting-asian-colleagues.jpg" alt="CEO Adrian Blair" className="object-cover w-full h-full rounded-lg" />
                </div>
            </section>
        </div>
    );

}
export default Partners;