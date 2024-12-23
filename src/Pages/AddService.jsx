import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Brand from '/public/lottiee/brand.json'
import Lottie from 'lottie-react';
import { motion } from "motion/react"

const AddService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = UseAuth();
    const currentDate = format(new Date(), 'yyyy-MM-dd')
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/add/service`, {
                ...data,
                userEmail: user.email,
                addedDate: currentDate,
                ratings: [],
            });
            toast.success('Service added successfully!')
            if (response.status === 201) {
                console.log(response)
                toast.success('Service added successfully!')
            }
        } catch (error) {
            console.log('Failed to add service, please try again', error)
            toast.error(`${error ? error.message : "Failed to add service, please try again"}`)
        }
    }
    return (
        <div className="container mx-auto p-6">
            <motion.h2
                animate={{ x: 50, color:['#33f786'] }}
                transition={{ duration: 3, delay: 1.5, ease: "linear", repeat:Infinity }}
                className="text-2xl font-bold mb-6 text-center">Add New Service
            </motion.h2>
            <div className='md:flex items-center justify-between'>
                <div className='w-full md:w-2/4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="image"
                                className="block text-gray-700 font-bold mb-2">
                                Service Image URL:
                            </label>
                            <input type="text" id="image"
                                {...register('image', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.image && <span
                                className="text-red-500">This field is required
                            </span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title"
                                className="block text-gray-700 font-bold mb-2">
                                Service Title:
                            </label>
                            <input type="text" id="title"
                                {...register('title', { required: true })}
                                className="shadow appearance-none border rounded w-full 
                            py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.title && <span
                                className="text-red-500">This field is required</span>
                            } </div> <div className="mb-4">
                            <label htmlFor="companyName"
                                className="block text-gray-700 font-bold mb-2">Company Name:</label>
                            <input type="text" id="companyName"
                                {...register('companyName', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.companyName && <span
                                className="text-red-500">This field is required</span>
                            } </div>
                        <div className="mb-4">
                            <label htmlFor="website"
                                className="block text-gray-700 font-bold mb-2">Website:</label>
                            <input type="text" id="website"
                                {...register('website', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.website && <span
                                className="text-red-500">This field is required</span>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description"
                                className="block text-gray-700 font-bold mb-2">Description:</label>
                            <textarea id="description"
                                {...register('description', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                                     leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.description && <span
                                className="text-red-500">This field is required</span>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category"
                                className="block text-gray-700 font-bold mb-2">Category:</label>
                            <input type="text" id="category"
                                {...register('category', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                        leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.category && <span
                                className="text-red-500">This field is required</span>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price"
                                className="block text-gray-700 font-bold mb-2">Price:</label>
                            <input type="number" id="price"
                                {...register('price', { required: true })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                            leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.price && <span
                                className="text-red-500">This field is required</span>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="addedDate"
                                className="block text-gray-700 font-bold mb-2">Added Date:</label>
                            <input type="text"
                                id="addedDate"
                                value={format(new Date(), 'yyyy-MM-dd')}
                                readOnly
                                className="shadow appearance-none border rounded w-full py-2 px-3
                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <button type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded
                                              focus:outline-none focus:shadow-outline
                                               hover:bg-blue-700 transition-colors">
                            Add Service
                        </button>
                    </form>
                </div>
                <div className='w-full lg:w-2/4'>
                    <Lottie animationData={Brand} />
                </div>
            </div>

        </div>
    );
};

export default AddService;