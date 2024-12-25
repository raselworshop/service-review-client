import React, { useEffect, useState } from 'react';
import UseAuth from '../Hooks/UseAuth';
import Spinner from '../Component/spinner/Spinner';
import ServiceCard from '../Component/Shared/ServiceCard';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const AllServices = () => {
    const { user } = UseAuth();
    const [ loading, setLoading ] = useState(true)
    const [services, setServices] = useState([]);
    const [error, setError] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0)
    const [itemPerpage, setItemperPage] = useState(9)
    const numberOfPages = Math.ceil(count / itemPerpage)

    const pages = [...Array(numberOfPages).keys()]

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, { withCredentials: true })
                console.log(response)
                setCategories(['All', ...response.data])
            } catch (error) {
                console.log(error)
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchCategories();
    }, [])
    useEffect(() => {
        const fetchAllServices = async () => {
            setLoading(true)
            try {
                const endpoint = selectedCategory === 'All' ?
                    `${import.meta.env.VITE_API_URL}/services?page=${currentPage}&size=${itemPerpage}` :
                    `${import.meta.env.VITE_API_URL}/services?category=${selectedCategory}&page=${currentPage}&size=${itemPerpage}`;
                const response = await axios.get(endpoint, { withCredentials: true });
                setServices(response.data)
                console.log("response data", response.data)
                if (response.data.length === 0) {
                    console.log('No services found for this category!');
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };
        fetchAllServices();
    }, [selectedCategory, currentPage, itemPerpage])

    const handleItemPerPage = (e) => {
        console.log(e.target.value)
        const numb = parseInt(e.target.value);
        setItemperPage(numb);
        setCurrentPage(0)
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = ()=>{
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1)
        }
    }
    if (loading) return <Spinner />
    if (error) return <div>Error: {error}</div>
    return (
        <div className='max-w-7xl mx-auto my-5'>
            <div className='mb-4'>
                <label htmlFor='category'
                    className='block text-sm font-medium text-gray-700'>
                    Select Category:
                </label>
                <select id='category'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='mt-1 block w-full py-2 px-3 border border-gray-300
                 bg-white rounded-md shadow-sm focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' >
                    {categories.map((category) => (
                        <option key={category}
                            value={category}>{category}
                        </option>
                    ))}
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'>
                {services.length > 0 ? (
                    services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No services found for this category.</p>
                )}
            </div>
            <div>
                <button onClick={handlePrevPage} className='btn btn-sm'>Prev</button>
                {pages.map((page, index) => (
                    <button key={index}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "btn btn-info btn-sm mr-2" : "btn btn-outline btn-sm mr-2"}>{page}</button>
                ))}
                <button onClick={handleNextPage} className='btn btn-sm'>Next</button>
                <select defaultValue={itemPerpage} onChange={handleItemPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllServices;