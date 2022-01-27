import React,{useState,useEffect} from 'react';
import {HistoricalChart} from '../config/api'
import { CryptoState } from '../Context';
import { Line } from "react-chartjs-2";
import axios from 'axios'
import Chart from 'chart.js/auto'
import {
  makeStyles,
  createTheme,
  Container,
  Typography,
   CircularProgress,
  ThemeProvider,
} from "@material-ui/core";
import {chartDays} from '../config/chartDays'
import CustomBtn from './CustomBtn';
const CoinChart = ({coin}) => {
 
    const darkTheme=createTheme({
         primary: {
      main: "#fff",
    },
    type: "dark",
    })

    const useStyles=makeStyles((theme)=>({
     
    }))
  const classes=useStyles()
  const [hist,setHist]=useState([])
  const [days,setDays]=useState(1)
  const {currency}=CryptoState()
const [flag,setflag] = useState(false);

  useEffect(()=>{
     const getChart=async()=>{
         try{
            const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
            setHist(data.prices);
            setflag(true)
            console.log(data.prices)
        }
         catch(error){
            console.log(error)
         }
     }
     getChart()
 },[currency,days])
 const getDate=()=>{
       if(days===1){
           return `Price yesterday in ${currency}`
       }
       else {
           return  `Price ( Past ${days} Days ) in ${currency}`
       }
 }
  return (
  <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
      {
          !hist | flag===false? (<CircularProgress style={{color:'var(--green-2)',display:'flex',justifyContent:'center',width:'100%'}} size={200} thickness={1}/>):
          (<>
        
            <Line
              data={{
                labels: hist.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: hist.map((coin) => coin[1]),
                    label:getDate(),
                    borderColor: "#04cc25",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            /> 
            <div style={{display:'flex',marginTop:20,justifyContent:'space-around',width:'100%'}}>
                {chartDays.map((day)=>(
                    <CustomBtn
                        key={day.value}
                        onClick={()=>setDays(day.value)}
                        selected={day.value===days}>
                        {day.label}
                    </CustomBtn>
                ))}
            </div>
          </>)
      }
    </div> 
  </ThemeProvider>);
};

export default CoinChart;
