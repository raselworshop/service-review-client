import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import UseAuth from '../../Hooks/UseAuth';
import axios from 'axios';

const AddReview = ({ service, refetchServiceDetails }) => {
    // console.log(service.title)
    const { user } = UseAuth();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0)
    const currentDate = format(new Date(), 'yyyy-MM-dd')

    const onSubmit = async (data) => {
        const toastId = toast.loading('Sumitting your review...')
        try {
            const reviewData = {
                ...data,
                reviewDate: currentDate,
                review : data.review,
                rating: rating,
                serviceTitle: service.title, //here not adding in backend
                email : user.email,
                photo: user.photoURL || user.photo,
                Name: user.displayName || user.name,
                serviceId: service._id,
            }
            // console.log(service.title) // is ok
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData)
            if (res.status === 201) {
                // console.log('review add successful')
                
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/rating/${service._id}`, reviewData);
            if (response.status === 201) {
                // console.log('rating added successfully')
            }
            refetchServiceDetails()
            toast.dismiss(toastId)
            toast.success('Review added successfully!');
            reset();
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.message);
        }
    };

    const handleRating = (value) => {
        setRating(value)
        setValue('rating', value)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="rating" className="text-gray-700 font-bold mb-2">Rating:</label>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRating(star)}
                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                {errors.rating && <span className="text-red-500">{errors.rating?.message}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="review"
                    className="block text-gray-700 font-bold mb-2">Review:</label>
                <textarea id="review"
                    {...register('review', { required: true })}
                    className="shadow appearance-none border rounded w-full 
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                 focus:shadow-outline" />
                {errors.review && <span
                    className="text-red-500">Please provide a review</span>
                }
            </div>
            <button type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 
                 rounded focus:outline-none focus:shadow-outline
                  hover:bg-blue-700 transition-colors">
                Add Review
            </button>
        </form>
    );
};

export default AddReview;
