import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "./LandingPage/NavBar";

const Request = () => {
  const [name, setName] = useState('');
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // Base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/request-collection', {
        name,
        image: imageData,
        location,
      });
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Garbage Collection Request</h2>
            <p className="text-gray-500 mb-6">Please provide the details below for your garbage collection request.</p>

            <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                {/* Name Input */}
                <div className="md:col-span-1">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>

                {/* Address Input */}
                <div className="md:col-span-1">
                  <label htmlFor="address" className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Address"
                    value={location}
                    onChange={handleAddressChange}
                  />
                </div>

                {/* Image Input */}
                <div className="md:col-span-2">
                  <label htmlFor="image" className="block text-gray-700">Upload an Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="mt-1"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-custom-green  text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
