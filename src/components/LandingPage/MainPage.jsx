import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';

const MainPage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Paper elevation={0} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{color: 'darkgreen'}}>
            Welcome to Clean & Green Technology
          </Typography>
          <Typography variant="h5" paragraph sx={{color: 'darkgreen'}}>
            A comprehensive and innovative approach to waste management.
          </Typography>
          <Button variant="contained" sx={{backgroundColor: '#19d26c'}}>
            Learn More
          </Button>
        </Paper>

        {/* Mission Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" gutterBottom sx={{color: 'darkgreen'}} > 
            Our Mission
          </Typography>
          <Typography paragraph>
            Our mission is to revolutionize waste management through cutting-edge technology and a commitment to sustainability. We aim to make waste management more efficient and encourage active participation in recycling efforts. Our innovative approach integrates AI-based scanning, user-friendly interfaces, and a rewarding system to foster a cleaner and greener environment.
          </Typography>
        </Box>

        {/* Services Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' , boxShadow: '4px 2px 2px 3px #19d26c'}}>
              <Typography variant="h5" gutterBottom>
                Customer Interface
              </Typography>
              <Typography paragraph>
                Easily request waste collection, check location accessibility, and schedule pickups with our intuitive customer interface.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' , boxShadow: '4px 2px 2px 3px #19d26c'}}>
              <Typography variant="h5" gutterBottom>
                Service Provider Interface
              </Typography>
              <Typography paragraph>
                Manage waste collection requests, track locations, and optimize routes for efficient pickups with our comprehensive service provider tools.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' , boxShadow: '4px 2px 2px 3px #19d26c'}}>
              <Typography variant="h5" gutterBottom>
                AI-Based Scanning
              </Typography>
              <Typography paragraph>
                Utilize advanced AI to scan and categorize waste, assess its quality, and award points based on the recyclability of the materials.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;
