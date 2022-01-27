import {useEffect,useState } from 'react'
import { makeStyles} from '@material-ui/styles';
import axios from 'axios';
import React from 'react';
import {TrendingCoins }from '../../config/api'
import { CryptoState } from '../../Context';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const Carousel = (props) => {
    const useStyles=makeStyles({
        car:{
            height:200,
            display:'flex',
            alignItems:'center'
        },
        carouselItem:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            cursor:"pointer",
            textTransform:'uppercase',
            color:"white"
        }
    })

    const classes=useStyles(props)
    const {currency,symbol}=CryptoState()
    const [trending,setTreding]=useState([])

    useEffect(()=>{
        const getTrendingCoins=async()=>{
            try{
            const {data} =await axios.get(TrendingCoins(currency))
            setTreding(data)
        }
            catch(error){
                console.log(error)
            }
        }
        getTrendingCoins()
    },[currency])

    const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")

    }

    const items=trending.map((coin)=>
        {
            let profit=coin.price_change_percentage_24h>=0;
            return(
                <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
                   <img 
                   src={coin?.image}
                   alt={coin.name}
                   height='80'
                   style={{marginBottom:10}}/> 
                   <span>
                       {coin?.symbol}
                       &nbsp;
                       <span
                       style={{
                        color: profit > 0 ? "var(--green-1)" : "red",
                        fontWeight: 500}}>
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                       </span>
                   </span>
                   <span style={{fontSize:22,fontWeight:500}}>
                       {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>

                </Link>
            )
        }
     )

    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    }

  return <div className={classes.car}>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1000}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      />
  </div>;
};

export default Carousel;
