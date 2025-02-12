import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Brand from '/public/lottiee/brand.json';
import Lottie from 'lottie-react';
import { motion } from "framer-motion";
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const AddService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post(`/user/add/service`, {
                ...data,
                userEmail: user.email,
                userImg: user.photoURL,
                userName: user.displayName,
                addedDate: currentDate,
                ratings: [],
            });

            if (response.status === 201) {
                toast.success('✅ Service added successfully!');
            }
        } catch (error) {
            toast.error(`❌ ${error.message || "Failed to add service, please try again."}`);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-bold text-center text-blue-600 mb-8"
            >
                Add New Service
            </motion.h2>

            <div className='md:flex items-center justify-between gap-8'>
                
                {/* Form Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className='w-full md:w-1/2 dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-500 dark:border-gray-200'
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Input Fields */}
                        {[
                            { id: "image", label: "Service Image URL", type: "text" },
                            { id: "title", label: "Service Title", type: "text" },
                            { id: "companyName", label: "Company Name", type: "text" },
                            { id: "website", label: "Website", type: "text" },
                            { id: "category", label: "Category", type: "text" },
                            { id: "price", label: "Price", type: "number" }
                        ].map(({ id, label, type }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block font-semibold">
                                    {label}:
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    {...register(id, { required: true })}
                                    className="w-full py-2 px-3 border rounded-lg shadow-sm focus:border-blue-700 bg-slate-400 text-slate-900 dark:bg-gray-900 focus:ring focus:ring-blue-200 transition-all"
                                />
                                {errors[id] && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                        ))}

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block font-semibold">Description:</label>
                            <textarea
                                id="description"
                                {...register('description', { required: true })}
                                className="w-full py-2 px-3 border rounded-lg shadow-sm focus:border-blue-500 bg-slate-400 text-slate-900 dark:bg-gray-900 focus:ring focus:ring-blue-200 transition-all"
                            />
                            {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        {/* Added Date (Read Only) */}
                        <div>
                            <label htmlFor="addedDate" className="block font-semibold ">Added Date:</label>
                            <input
                                type="text"
                                id="addedDate"
                                value={currentDate}
                                readOnly
                                className="w-full py-2 px-3 border bg-slate-400 text-slate-900 dark:bg-gray-900 rounded-lg shadow-sm cursor-not-allowed"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Add Service
                        </motion.button>
                    </form>
                </motion.div>

                {/* Animation Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className='w-full md:w-1/2 flex justify-center'
                >
                    <Lottie animationData={Brand} className="w-full max-w-md" />
                </motion.div>
            </div>
        </div>
    );
};

export default AddService;
