import React, { useState } from "react";
import UseAuth from "../Hooks/UseAuth";

const UserProfile = ({ user, handleUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" shadow-md rounded-lg p-6 max-w-md w-full">
        {/* Profile image */}
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-xl font-bold">{user.displayName || "Name not provided"}</h1>
          <p className="text-gray-500">{user.email || "Email not provided"}</p>
        </div>

        {/* other info */}
        <div className="mt-6">
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone || "Not available"}</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="font-semibold">Address:</span>
            <span>{user.address || "Not available"}</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="font-semibold">Role:</span>
            <span>{user.role || "User"}</span>
          </div>
        </div>

        {/* profile edit button */}
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50">
          <div className=" p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedUser = {
                  phone: formData.get("phone"),
                  address: formData.get("address"),
                  role: formData.get("role"),
                };
                handleUpdate(updatedUser);
                setShowModal(false);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold">Phone</label>
                <input
                  name="phone"
                  type="text"
                  defaultValue={user.phone || ""}
                  className="border w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Address</label>
                <input
                  name="address"
                  type="text"
                  defaultValue={user.address || ""}
                  className="border w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Role</label>
                <input
                  name="role"
                  type="text"
                  defaultValue={user.role || "User"}
                  className="border w-full p-2 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user, setUser } = UseAuth();

  const handleUpdate = (updatedInfo) => {
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser); // Update user information in your context or state
    console.log("Updated User:", updatedUser);
  };

  return <UserProfile user={user} handleUpdate={handleUpdate} />;
};

export default Profile;
