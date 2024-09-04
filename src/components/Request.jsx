import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as mobilenet from "@tensorflow-models/mobilenet";
import NavBar from "./LandingPage/NavBar";
import ECO from '../assets/eco_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg';

import { Button } from '@mui/material';

let AV_COINS = 0;

const Request = () => {
  const [name, setName] = useState('');
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [plasticPercentage, setPlasticPercentage] = useState(null);
  const [model, setModel] = useState(null);

  const plasticLabels = [
    'plastic bag', 'plastic bottle', 'plastic cup', 'plastic fork', 'plastic spoon',
    'plastic knife', 'plastic container', 'plastic wrap', 'plastic straws',
    'plastic utensils', 'plastic food wrapper', 'plastic packaging', 'plastic sheet',
    'plastic tube', 'plastic box', 'plastic toys', 'plastic containers', 'plastic utensils',
    'plastic plates', 'plastic cups', 'plastic cutlery', 'plastic bags', 'plastic wrappers',
    'plastic films', 'plastic trays', 'plastic tupperware', 'plastic straws', 'plastic lids',
    'plastic bottle caps'
  ];

  useEffect(() => {
    // Load the model when the component mounts
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const estimatePlasticAmount = (predictions) => {
    let plasticAmount = 0;

    for (let prediction of predictions) {
      const classNames = prediction.className.toLowerCase().split(', ');

      for (let label of classNames) {
        if (plasticLabels.includes(label)) {
          // Assume a simple scoring based on confidence
          plasticAmount += prediction.probability;
        }
      }
    }

    // Return the plastic amount as a percentage
    return (plasticAmount * 100).toFixed(2); // Round to 2 decimal places
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setLocation(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageDataUrl = reader.result; // Base64 string
      setImageData(imageDataUrl);

      // Create an image element
      const img = new Image();
      img.src = imageDataUrl;
      img.onload = async () => {
        if (model) {
          const predictions = await model.classify(img);
          const plasticPercent = estimatePlasticAmount(predictions);
          setPlasticPercentage(plasticPercent);
        }
      };
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const isContactValid = () => {
    // Check if the contact is exactly 10 digits
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isContactValid()) {
      alert('Please enter a valid 10-digit contact number.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/request-collection', {
        name,
        image: imageData,
        location,
        contact,
        plasticPercentage, // Add plastic percentage to the request
      });
      alert('Data submitted successfully!');
      
      // Convert plasticPercentage to a number
      const plasticPercentageNumber = parseInt(plasticPercentage);
      
      if (!isNaN(plasticPercentageNumber)) {
        AV_COINS += plasticPercentageNumber;
        alert(`Congratulations! You have received ${plasticPercentageNumber} AV coins`);
      } else {
        alert('Plastic percentage could not be calculated correctly.');
      }
      
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="relative min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="absolute top-0 right-0 m-4">
          <Button size='large' sx={{ backgroundColor: 'darkgreen', color: '#19d26c' }}>
            <img src={ECO} alt="ECO Icon" /> {AV_COINS}
          </Button>
        </div>
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

                {/* Contact Input */}
                <div className="md:col-span-1">
                  <label htmlFor="contact" className="block text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="10-digit Contact Number"
                    value={contact}
                    onChange={handleContactChange}
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

                {/* Display Plastic Percentage */}
                {plasticPercentage !== null && (
                  <div className="md:col-span-2">
                    <p className="text-gray-700">Detected Plastic Percentage: {plasticPercentage}%</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="md:col-span-2 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-custom-green text-white font-bold py-2 px-4 rounded"
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
