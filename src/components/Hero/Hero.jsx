import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import video from '../../assets/video.mp4'
import Carousel from './Carousel';
import { CryptoState } from '../../Context';

const Hero = (props) => {
    const useStyles=makeStyles({
    container:{
    
      },
    tagline:{
        height:300,
        display:"flex",
        flexDirection:'column',
        textAlign:'center',
        alignItems:"center",
        zIndex:999,
        position:'relative',
        justifyContent:'center',
  }
  ,

  carousel:{
    zIndex:999,
    position:'relative',
  }

})
const classes=useStyles(props)
  return <div style={{height:"100vh"}}>
    <Container className={classes.container}>
   <video loop autoPlay muted style={{objectFit:'cover',width:'100%',height:'100vh',position:'absolute',left:0}}>
       <source src={video} type='video/mp4'/>
   </video>
   <div className={classes.tagline}>
     <Typography  variant='h2' style={{fontWeight:"bolder",marginBottom:15,textTransform:'uppercase',letterSpacing:'var(--spacing)'}}>
         Crypto Dose
     </Typography>
     <Typography  variant='h6' style={{color:'var(--grey-1)', textTransform:'Capitalize'}}>
         Keep In track with the latest Trend and News of Crypto Currency
     </Typography>
     </div>
     <div className={classes.carousel}>
       <Carousel/>
     </div> 
    </Container>
  </div>;
};

export default Hero;
