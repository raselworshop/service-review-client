import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import UseAuth from '../../Hooks/UseAuth';
import Spinner from '../../Component/spinner/Spinner';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
Modal.setAppElement('#root');

const MyReviews = () => {
  const { user } = UseAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const instanceAxios = UseAxiosSecure()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/user/${user.email}`, {withCredentials:true});
        instanceAxios.get(`/reviews/user/${user.email}`)
        .then(response=>{
          setReviews(response.data);
        })
      } catch (error) {
        setError('Failed to fetch reviews');
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user.email]);

  const openModal = (review) => {
    setCurrentReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentReview(null);
  };

  const handleUpdate = async (data) => {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            // const response = await axios.put(`${import.meta.env.VITE_API_URL}/reviews/update/${currentReview._id}`, data);
            const response = await instanceAxios.put(`/reviews/update/${currentReview._id}`, data)
            if (response.status === 200) {
              toast.success('Review updated successfully');
              const updatedReviews = reviews.map((review) =>
                review._id === currentReview._id ? { ...review, ...data } : review
              );
              setReviews(updatedReviews);
              closeModal();
            }
          } catch (error) {
            toast.error('Failed to update review');
            // console.log(error);
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  };

  const handleDelete = async (reviewId) => {
    Swal.fire({
        title: "Do you want to delete the review?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "yes, delete",
        denyButtonText: `No, don't delete`
      }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                // const response = await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/delete/${reviewId}`);
                const response = await instanceAxios.delete(`/reviews/delete/${reviewId}`)
                if (response.status === 200) {
                  toast.success('Review deleted successfully');
                  setReviews(reviews.filter(review => review._id !== reviewId));
                }
              } catch (error) {
                toast.error('Failed to delete review');
                // console.log(error);
              }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  };

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.map(review => (
        <div key={review._id} className="mb-4 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{review.serviceTitle || "Anonymous"}</h3>
          <p className="mb-2">{review.review}</p>
          <p className="text-yellow-500 mb-2">Rating: {review.rating}</p>
          <button
            onClick={() => openModal(review)}
            className="bg-blue-500 px-4 py-2 rounded mr-2"
          >
            Update
          </button>
          <button
          
            onClick={() => handleDelete(review._id)}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {currentReview && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate({
              review: e.target.review.value,
              rating: e.target.rating.value,
            });
          }}>
            <h2 className="text-2xl font-bold mb-4">Update Review</h2>
            <div className="mb-4">
              <label htmlFor="serviceTitle" className="block font-bold mb-2">Service Title:</label>
              <input
                type="text"
                id="serviceTitle"
                value={currentReview.serviceTitle}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block font-bold mb-2">Review:</label>
              <textarea
                id="review"
                defaultValue={currentReview.review}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block  font-bold mb-2">Rating:</label>
              <input
                type="number"
                id="rating"
                defaultValue={currentReview.rating}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                min="1"
                max="5"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyReviews;
