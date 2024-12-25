import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="max-w-sm flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={service.image}
        alt={service.title}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-800">{service.title}</h2>
        <p className="text-gray-600 text-sm mt-2">
          {service.description.length > 100
            ? service.description.slice(0, 100) + "..."
            : service.description}
        </p>
        <p className="text-blue-500 font-semibold my-4">
          Category: {service.category}
        </p>
        <p className="text-blue-500 font-semibold my-4">
          Price: ${service.price}
        </p>
        <Link to={`/service-details/${service._id}`} className="mt-auto text-center bg-blue-500 text-white px-4 py-2 rounded-md outline-blue-600 hover:bg-blue-600 transition-colors">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
