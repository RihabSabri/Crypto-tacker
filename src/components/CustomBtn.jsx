import React from 'react';
import { makeStyles } from '@material-ui/core';
const CustomBtn = ({children,selected,onClick}) => {
const useStyles=makeStyles((theme)=>({
    btn:{
      border: "1px solid var(--green-1)",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: "pointer",
      backgroundColor: selected ? "var(--green-2)" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "var(--green-2)",
        color: "black",
      },
      width: "15%",
      [theme.breakpoints.down("sm")]: {
       padding:10,
       paddingBottom:5,
       fontSize:14,

      },

    }
}))

const classes=useStyles()
  return <span 
  onClick={onClick}
  className={classes.btn}>{children}</span>;
};

export default CustomBtn;
