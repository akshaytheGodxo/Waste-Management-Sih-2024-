import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "./LandingPage/NavBar";
import { TextField } from '@mui/material';
import { Container, Box, Typography, Button } from '@mui/material';
const Request = () => {
  const [name, setName] = useState('');
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setLocation(e.target.value);
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
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

      <Container>
      <Box border={'2px solid green'} marginTop={'2px'} alignContent={'center'} justifyContent={'center'} alignItems='center'>
      <Typography variant='h2'>Garbage Collection Request</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField type="text" value={name} onChange={handleNameChange} variant='filled' label='Username' required />
        </div>
        <br />
        <div>
          <TextField type="text" value={location} onChange={handleAddressChange} variant='filled' label='Address' required />
        </div>
        <br></br>
        <div>
          <label>Upload Garbage Image:</label><br></br>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div><br />
        
        <Button type="submit" variant='filled' sx={{backgroundColor: 'green'}}>Submit</Button>
        {imageData && <img src={imageData} alt="Garbage Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </form>
      </Box>
      </Container>
    </div>
  );
};

export default Request;
