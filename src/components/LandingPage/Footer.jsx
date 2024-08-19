import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#19d26c',
        padding: '2rem 0',
        borderTop: '1px solid #e0e0e0'
        
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{color: 'white'}}>
              EcoZenith
            </Typography>
            <Typography variant="body2" sx={{color: 'white'}}>
              &copy; {new Date().getFullYear()} EcoZenith. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{color: 'white'}}>
              Quick Links
            </Typography>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>
              Home
            </Link>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>
              About Us
            </Link>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>  
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{color: 'white'}}>
              Follow Us
            </Typography>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>
              Facebook
            </Link>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>
              Twitter
            </Link>
            <Link href="#" variant="body2" color="inherit" display="block" sx={{color: 'white'}}>
              LinkedIn
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
