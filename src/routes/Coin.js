import React, { useState, useEffect } from "react";
import { Footer } from "../components";
import { useLocation } from "react-router";
import { CryptoState } from "../Context";
import { SingleCoin } from "../config/api";
import { CoinChart } from "../components";
import ReactHtmlParser from "react-html-parser";
import {
  makeStyles,
  createTheme,
  Container,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";

const Coin = () => {
  const darkTheme = createTheme({
    primary: {
      main: "#fff",
    },
    type: "dark",
  });

  const useStyles = makeStyles((theme) => ({
    progressBar: {
      backgroundColor: "var(--green-2)",
    },
    container: {
      display: "flex",
      minHeight: "110vh",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    RightPart: {
      width: "70%",

      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "90%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    leftPart: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        borderRight: "none",
        overFlow: "hidden",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    coinImage: {
      marginBottom: 20,
    },
    headings: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      marginBottom: 5,
    },
    symbol: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      textTransform: "upperCase",
      marginBottom: 15,
      color: "var(--green-2)",
    },

    desc: {
      padding: 25,
      paddingTop: 0,
      paddingBottom: 15,
      textAlign: "justify",
    },
    listItem: {
      fontSize: 20,
      color: "var(--green-2)",
      fontWeight: "bolder",
      marginLeft: 10,
      [theme.breakpoints.down("md")]: {
        fontSize: 18,
      },
    },
    info: {
      padding: 25,
      alignSelf: "start",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
        marginLeft: 0,
      },
    },
  }));

  const classes = useStyles();

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const getSingleCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(path));
        setCoin(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCoin();
  }, [currency, path]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (!coin) {
    return <LinearProgress className={classes.progressBar} />;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <div className={classes.leftPart}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            className={classes.coinImage}
          />
          <Typography variant="h3" className={classes.headings}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.symbol}>
            {coin?.symbol}
          </Typography>
          <Typography variant="subtitle1" className={classes.desc}>
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}
          </Typography>
          <div className={classes.info}>
            <ListItemText>
              <Typography variant="h5">
                Rank:
                <span className={classes.listItem}>
                  {" "}
                  {coin?.market_cap_rank}
                </span>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="h5">
                Current Price:
                <span className={classes.listItem}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </span>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="h5">
                Market Cap:
                <span className={classes.listItem}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                  )}
                </span>
              </Typography>
            </ListItemText>
          </div>
        </div>
        <div className={classes.RightPart}>
          <CoinChart coin={coin} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Coin;
