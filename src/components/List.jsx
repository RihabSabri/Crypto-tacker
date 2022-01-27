import React,{useState,useEffect, useContext} from 'react';
import { CoinList } from '../config/api';
import { makeStyles,
        createTheme,
        Table,
        TableBody,
        Paper,
        TableCell,
        TableHead,
        ThemeProvider,
        TableContainer,
        Container,
        TableRow,
        Typography, 
        LinearProgress} from '@material-ui/core';
import axios from 'axios';
import { CryptoState } from '../Context';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import {Pagination} from '@material-ui/lab'

const List = (props) => {
    const {currency,symbol}=CryptoState()
    const [coins,setCoins]=useState([])
    const [loading,setLoading]=useState(false)
    const [page,setPage]=useState(1)
    const [search,setSearch]=useState('')
    const navigate=useNavigate()
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    })
    const useStyles = makeStyles({
        row: {
            backgroundColor:'var(--dark-1)',
            "&:hover":{
                backgroundColor:'var(--dark-2)'
            }
           
        },
        head:{

            color:"white",
            backgroundColor:'var(--green-1)',
            fontWeight:"700",

        },
        input:{
            width:'100%',
             marginTop:50,
             marginBottom:20
        },
        pagination:{
            padding:20,
            width:'100%',
            display:'flex',
            justifyContent:'center',
             "& .MuiPaginationItem-root":{
               color:'var(--green-2)'
           },
           marginBottom:50,
        },

    });

      
    const classes = useStyles();
    useEffect(()=>{
        const getCoinsList=async()=>{
            setLoading(true)
            try{
                const {data}=await axios.get(CoinList(currency)) 
                setCoins(data)        
               }
            catch(error){
               console.log(error) 
            }
            setLoading(false)
        }
        getCoinsList()
    },[currency])

    
     
    const handleSearch=()=>{
    
        return coins.filter((coin)=>coin.id.toLowerCase().includes(search.toLocaleLowerCase()))

    }
     const numberWithCommas=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")

    }

    return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center", minHeight:'100vh',marginTop:'100px',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Typography variant ='h3'>
                Crypto Currencies Worth By Market Cap
            </Typography>
        <TextField className={classes.input} label="Search for CryptoCoin" variant="outlined" onChange={(e)=> setSearch(e.target.value)}/>
        <TableContainer component={Paper}>
            {loading? (
                <LinearProgress style={{backgroundColor:'var(--green-2)'}}/>
                    ):<Table 
                       
                    className={classes.table} aria-label="simple table">
                        <TableHead style={{backgroundColor:'var(--dark-1)'}}>
                        <TableRow>
                            {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                <TableCell
                                className={classes.head}
                                key={head}
                                align={head==='Coin'?"":"right"}
                                >{head}</TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((page-1)*10,(page-1)*10+10)
                            .map((row)=>{let profit=row.price_change_percentage_24h>=0;
                                return(
                                    <TableRow
                                    className={classes.row}
                                    onClick={()=>navigate(`/coin/${row.id}`)}
                                    key={row.id}>
                                    <TableCell component='th' scope='row' style={{display:'flex',gap:15}}>
                                       <img
                                       src={row?.image}
                                       alt={row.id}
                                       height='50'
                                       style={{marginBottom:10,cursor:'pointer'}} />
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                         <span>
                                            {row?.symbol.toUpperCase()}
                                         </span>
                                            <span
                                            style={{color:'var( --grey-1)'}}>
                                                {row.id}
                                            </span>
                                    </div>
                                    </TableCell> 
                                    <TableCell
                                    align='right'>
                                        {symbol}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell
                                    align='right'
                                     style={{
                                        color: profit>0 ?"var(--green-1)" : "red",
                                        fontWeight: 500}}>
                                        {profit && "+"}{row?.price_change_percentage_24h?.toFixed(2)}%
                                    
                                    </TableCell> 
                                      <TableCell
                                    align='right'
                                     >
                                        {symbol}{""}
                                        {numberWithCommas(row.market_cap.toFixed(2))}
                                    </TableCell>
                                    </TableRow>
                                )})} 
                        </TableBody>
                    </Table>}
        </TableContainer>
        <Pagination
            classes={{ul:classes.pagination}}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_,value)=>{
                setPage(value)
                window.scroll(0,800)
            }}
        />
        </Container>
    </ThemeProvider>)
};

export default List;
