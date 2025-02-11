import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-sm flex flex-col rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-200">
      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-2xl transition-all duration-500"
          src={service.image}
          alt={service.title}
        />
        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          {service.category}
        </div>
        {/* Price Section */}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          ${service.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900">{service.title}</h2>

        {/* Description with Read More */}
        <p className="text-sm text-gray-600 mt-2">
          {expanded ? service.description : service.description.slice(0, 70)}
          {service.description.length > 70 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 font-semibold ml-1 hover:underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        {/* Button */}
        <Link
          to={`/service-details/${service._id}`}
          className="mt-auto text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:scale-105 transition-transform duration-300 hover:shadow-lg"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
