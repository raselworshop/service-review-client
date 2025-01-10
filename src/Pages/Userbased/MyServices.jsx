import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/UseAuth';
import Spinner from '../../Component/spinner/Spinner';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
Modal.setAppElement('#root');

const MyServices = () => {
    const { user } = UseAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const instanceAxios = UseAxiosSecure()

    // Fetch services when the component is mounted
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/user/${user.email}`, {withCredentials:true});
                instanceAxios.get(`/services/user/${user.email}`)
                .then(response=>{
                    setServices(response.data);
                })
            } catch (error) {
                // console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [user.email]);

    const openModal = (service) => {
        setCurrentService(service);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentService(null);
    };

    const handleUpdate = async (serviceId, updatedData) => {
        // console.log('Service ID:', serviceId);
        // console.log('Sending data:', updatedData); //ekhane data paoa jay na

        try {
            // const response = await axios.put(`${import.meta.env.VITE_API_URL}/services/update/${serviceId}`, updatedData);
            const response = await instanceAxios.put(`/services/update/${serviceId}`, updatedData)
            if (response.status === 200) {
                toast.success('Service updated successfully');
                const updatedServices = services.map(service =>
                    service._id === currentService._id ? { ...service, ...updatedData } : service
                );
                setServices(updatedServices);
                closeModal();
            }
        } catch (error) {
            toast.error('Failed to update service');
            // console.log(error);
        }
    };
 
    const handleDelete = async (serviceId) => {
        Swal.fire({
            title: 'Do you want to delete this service?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            denyButtonText: `No, don't delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const response = await axios.delete(`${import.meta.env.VITE_API_URL}/services/delete/${serviceId}`);
                    const response = await instanceAxios.delete(`/services/delete/${serviceId}`)
                    if (response.status === 200) {
                        toast.success('Service deleted successfully');
                        setServices(services.filter(service => service._id !== serviceId));
                    }
                } catch (error) {
                    toast.error('Failed to delete service');
                    // console.log(error);
                }
            } else {
                Swal.fire('Service not deleted', '', 'info');
            }
        });
    };

    if (loading) return <Spinner />;
    if (!services.length) return <div>No services found</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Services: "{services.length}"</h2>
            {/* Search Input */}
            <input type="text" placeholder="Search Services..."
                className="border p-2 mb-4 w-full rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Service Table */}
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Service Title</th>
                        <th className="py-2 px-4">Category</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.filter(service => service.title.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(service => (
                        <tr key={service._id} className="border-t hover:bg-gray-50">
                            <td className="py-2 px-4">{service.title}</td>
                            <td className="py-2 px-4">{service.category}</td>
                            <td className="py-2 px-4">
                                <button onClick={() => openModal(service)}
                                    className="bg-blue-500 px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors" >
                                    Update
                                </button>
                                <button onClick={() => handleDelete(service._id)}
                                    className="bg-red-500 px-4 py-2 rounded 
                                     hover:bg-red-600 transition-colors" > Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Update Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                className="p-6 rounded-lg shadow-lg mx-auto max-w-lg modal-scroll modal-box" >
                {currentService && (<div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const updatedData = {
                            image: e.target.image.value,
                            title: e.target.title.value,
                            companyName: e.target.companyName.value,
                            website: e.target.website.value,
                            description: e.target.description.value,
                            category: e.target.category.value,
                            price: parseFloat(e.target.price.value),
                        };
                        // console.log('Sending data:', updatedData); //ekhane data thik moto jay

                        handleUpdate(currentService._id, updatedData);
                    }} >
                        <h2 className="text-xl font-bold mb-4">Update Service</h2>
                        <div className="mb-4">
                            <label htmlFor="image"
                                className="block font-bold mb-2">Service Image:</label>
                            <input type="text" id="image"
                                defaultValue={currentService.image}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight 
                                            focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title"
                                className="block font-bold mb-2">Service Title:</label>
                            <input type="text" id="title"
                                defaultValue={currentService.title}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight
                                                 focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="companyName" className="block font-bold mb-2">Company Name:</label>
                            <input type="text" id="companyName"
                                defaultValue={currentService.companyName} className="shadow appearance-none border rounded w-full py-2 px-3
                                                     leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="website" className="block font-bold mb-2">Website:</label>
                            <input type="url" id="website"
                                defaultValue={currentService.website}
                                className="shadow appearance-none border rounded w-full py-2 px-3  
                                                        leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description"
                                className="block font-bold mb-2">Description:</label>
                            <textarea id="description"
                                defaultValue={currentService.description}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                                             leading-tight focus:outline-none focus:shadow-outline" rows="3" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category"
                                className="block font-bold mb-2">Category:</label>
                            <input type="text" id="category"
                                defaultValue={currentService.category}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                                                 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block font-bold mb-2">Price:</label>
                            <input type="number" id="price"
                                defaultValue={currentService.price}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                                                    leading-tight focus:outline-none focus:shadow-outline" min="0" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="addedDate" className="block font-bold mb-2">Added Date:</label>
                            <input type="text" id="addedDate"
                                value={new Date(currentService.addedDate).toLocaleDateString()}
                                className="shadow appearance-none border rounded w-full py-2 px-3
                                                                           leading-tight focus:outline-none focus:shadow-outline" readOnly />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="userEmail" className="block font-bold mb-2">User Email:</label>
                            <input type="email" id="userEmail"
                                value={currentService.userEmail}
                                className="shadow appearance-none border rounded w-full py-2 px-3 
                                                                              leading-tight focus:outline-none focus:shadow-outline" readOnly />
                        </div>
                        <button type="submit"
                            className="bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none
                                                                               focus:shadow-outline hover:bg-blue-700 transition-colors" > Save Changes
                        </button>
                    </form>
                </div>
                )}
            </Modal>
        </div>
    );
};

export default MyServices;

//   <form onSubmit={(e) => {
//     e.preventDefault();
//     handleUpdate({
//       title: e.target.title.value,
//       category: e.target.category.value,
//     });
//   }}>
//     <h2 className="text-2xl font-bold mb-4">Update Service</h2>
//     <div className="mb-4">
//       <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Service Title:</label>
//       <input
//         type="text"
//         id="title"
//         defaultValue={currentService.title}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         required
//       />
//     </div>
//     <div className="mb-4">
//       <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
//       <input
//         type="text"
//         id="category"
//         defaultValue={currentService.category}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         required
//       />
//     </div>
//     <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition-colors">
//       Save Changes
//     </button>
//   </form>