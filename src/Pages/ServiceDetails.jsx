import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import Spinner from '../Component/spinner/Spinner';
import AddReview from '../Component/Shared/AddReview';
import { Toaster } from 'react-hot-toast';
// import { motion, useScroll } from "motion/react"

const ServiceDetails = () => {
    const { user, } = UseAuth();
    // const { scrollYProgress } = useScroll()
    const [loading, setLoading] = useState(true)
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [error, setError] = useState('');
    const [ratingStats, setRatingState] = useState({});
    const navigate = useNavigate()

    const fetchServiceDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/details/${serviceId}`)
            console.log("response logged", response)
            setService(response.data)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchServiceDetails();
    }, [serviceId]);
    useEffect(() => {
        if (service?.ratings?.length) {
            const ratingStats = service.ratings.reduce((acc, curr) => {
                acc[curr.rating] = (acc[curr.rating] || 0) + 1;
                return acc;
            }, {});
            setRatingState(ratingStats);
        }
    }, [service?.ratings]);
    const handleEditReview = () => {
        navigate(`/my-reviews`)
    }

    if (loading || !service) return <Spinner />;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className='container mx-auto p-6 '>
            <div className="md:flex items-center justify-between gap-5">
                <Toaster />
                <div className='md:w-2/3'>
                    <div>
                        <div>
                            <h1 className="text-3xl font-bold mb-6">{service.title}</h1>
                            <img src={service.image} alt={service.title}
                                className="w-full h-96 object-cover mb-4" />
                            <p className="text-lg mb-4">{service.description}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <p className="text-blue-500 font-semibold mb-4">Price: ${service.price}</p>
                            <p className="text-gray-600 mb-2">Category: {service.category}</p>
                            <p className="text-gray-600 mb-2">Company: {service.companyName}</p>
                            <a href={service.website}
                                className="text-blue-500 mb-2 underline"
                                target="_blank" rel="noopener noreferrer">{service.website}</a>
                            <p className="text-gray-600 mb-2">
                                Added on: {format(new Date(service.addedDate), 'yyyy-MM-dd')}</p>

                            <p className="text-gray-600 mb-2">User Email: {service.userEmail}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-4">Rating Statistics:</h3>
                            <ul>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <li key={star}>
                                        {star} Star: {ratingStats[star] || 0} {ratingStats[star] === 1 ? 'review' : 'reviews'}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex flex-col items-start lg:items-center lg:justify-center'>
                            <img className='p-3 w-60 rounded-lg'
                                referrerPolicy='no-referrer'
                                src={service.userImg || "https://i.ibb.co/9r0LmCV/boy1.png"} alt="" />
                            <h3>{service.userName || "Annonymous"}</h3>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/3'>
                    <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
                    <AddReview refetchServiceDetails={fetchServiceDetails} service={service} />
                </div>
            </div>
            <div className='my-8'>
                {service?.ratings && <div className="service-details bg-white p-6 rounded-lg shadow-lg">

                    {/* Display ratings */}
                    <div className="ratings-section mb-8">
                        <h3 className="text-xl font-semibold mb-4">Ratings & Reviews</h3>
                        {service.ratings.length > 0 ? (
                            service.ratings.map((review, index) => (
                                <div key={index} className="review md:flex items-center mb-6 p-4 border-b border-gray-300">
                                    <div>
                                        <div className="review-header flex items-center mb-4">
                                            <img src={review.photo} alt="User" className="user-photo w-12 h-12 rounded-full mr-4" />
                                            <div>
                                                <h4 className="text-lg font-medium">{review.Name}</h4>
                                                <span className="text-sm text-gray-500">{review.reviewDate}</span>
                                            </div>
                                        </div>
                                        <div className="review-body mb-4">
                                            <p className="text-gray-800">{review.review}</p>
                                        </div>
                                        <div className="review-footer">
                                            <div className="rating flex">
                                                {/* Render stars based on the review.rating */}
                                                {Array.from({ length: review.rating }, (_, starIndex) => (
                                                    <span
                                                        key={starIndex}
                                                        className={`star text-yellow-500 ${starIndex < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        user.email === review.email && <div className='md:w-16'>
                                            <button className='btn btn-sm outline' onClick={handleEditReview}>My Reviews</button>
                                        </div>
                                    }
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default ServiceDetails;