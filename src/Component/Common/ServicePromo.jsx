import React from "react";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";

const ServicePromo = () => {
    const { user } = UseAuth()
    const handleListing=()=>{
        toast(user ? "Congratulations! You will be notified letter by email." : "Please log in to continue.")
    }
  return (
    <section className="bg-white/90 dark:bg-gray-700 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">It's free to be on Service Review</h1>
        <ul className="space-y-2 text-gray-700">
          <li>✅ 54% of Service Review users have an annual household income of $100,000 or more</li>
          <li>✅ 83% of users hire or buy from a business they found on Service Review</li>
          <li>✅ 74+ million people visit Service Review each month</li>
        </ul>
        <button
        onClick={handleListing}
        className="mt-auto text-center btn btn-accent px-4 py-2 rounded-md outline-blue-600 hover:btn-primary transition-colors">Verify my free listing</button>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 relative mt-8 md:mt-0">
        <img src="https://i.ibb.co/8c282NS/FO2-M5-IOag-Ak75k4.jpg" alt="Business Owner" className="rounded-lg shadow-lg" />
        
        {/* Floating Message Box */}
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md w-52">
          <p className="text-gray-900 dark:text-white/80  font-semibold">Message from Abby:</p>
          <p className="text-gray-600 dark:text-white/70 text-sm">Do you offer a flower delivery service?</p>
        </div>
        
        {/* Floating Review Box */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md w-56">
          <div className="flex items-center space-x-1">
            {Array(5).fill().map((_, i) => (
              <span key={i} className="text-red-500">★</span>
            ))}
          </div>
          <p className="text-gray-900 dark:text-white/80 font-semibold">Bloom & Co did an AMAZING job with our arrangement order!</p>
        </div>
      </div>
    </section>
  );
};

export default ServicePromo;
