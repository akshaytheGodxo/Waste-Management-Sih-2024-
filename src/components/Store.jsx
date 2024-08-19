import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from "@mui/material/Grid";
import NavBar from './LandingPage/NavBar';
import ECO from '../assets/eco_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg'
import TShirt from "../assets/t-shirt-1.webp";
import Bottle from "../assets/bottles.jpg"
import Footer from './LandingPage/Footer';
export default function Store() {
    return (
        <>
            <NavBar />
            <div style={{display: 'flex', marginTop: '10px'}}>
            <Button size='large' sx={{backgroundColor: 'darkgreen', color: '#19d26c', marginLeft : 'auto'}}>
                <img src={ECO}/> 12000
            </Button></div>
            <Grid container spacing={10} marginTop={1} marginLeft={30}>
                <Grid item >
                    <Card sx={{ maxWidth: 240}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={TShirt}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card sx={{ maxWidth: 240 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={TShirt}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card sx={{ maxWidth: 240 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={TShirt}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={10} marginTop={1} marginLeft={30}>
                <Grid item >
                    <Card sx={{ maxWidth: 240}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={Bottle}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card sx={{ maxWidth: 240 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={Bottle}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card sx={{ maxWidth: 240 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100"
                                image={Bottle}
                                alt="green iguana"
                                sx={{ boxShadow: '5px 10px #19d26c'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" display="flex" justifyContent="space-between">
                                    T-Shirts
                                    <Button size="small" sx={{ color: '#19d26c' }}>
                                        Redeem <img src={ECO} />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}
