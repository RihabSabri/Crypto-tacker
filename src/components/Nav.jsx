import React from 'react';
import { AppBar,Toolbar,Typography,Button, Container,Select, MenuItem, ThemeProvider,createTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../Context';


const darkTheme = createTheme({
  palette: {
    primary:{
     main:"#fff"
    },
    type: "dark",
  },
});
const Nav = (props) => {
   const useStyles = makeStyles((theme)=>({
    title:{
      flex :1,
      cursor:"pointer",
      textTransform:'uppercase',
      letterSpacing:'var(--spacing)',
      color: "var(--green-1)",
      [theme.breakpoints.down("sm")]: {
        letterSpacing:'0.9px'
      },
    },

  }));
  const classes=useStyles(props)
  const navigate=useNavigate()
  const {currency, setCurrency}=CryptoState()
  


  return (
    <ThemeProvider theme={darkTheme}>
     <AppBar position='static' color='transparent'>
      <Container>
      <Toolbar>
        <Typography
          onClick={()=>navigate('/')}
          className={classes.title} 
          variant='h6'>
            Crypto Dose
            </Typography>
          <Select 
          variant='outlined' 
          style={{width:100 ,height:40,marginLeft:15}}
          defaultValue={'USD'} 
          value={currency}
          onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>
              USD
            </MenuItem>
            <MenuItem value={'EUR'}>
              EUR
            </MenuItem>
          </Select>
        </Toolbar>
     </Container>
    </AppBar>
    </ThemeProvider>
  )
 
};

export default Nav;
