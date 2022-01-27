import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav, Footer } from "./components";
import { Home, Register, Login, Coin } from "./routes";
import { makeStyles } from "@material-ui/core/styles";

function App(props) {
  const useStyles = makeStyles({
    root: {
      backgroundColor: "var(--dark-2)",
      color: "white",
      minHeight: "100vh",
      position: "relative",
    },
  });
  const classes = useStyles(props);
  return (
    <Router>
      <div className={classes.root}>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/coin/:id" element={<Coin />} />
          <Route exact path="/auth/login" element={<Login />} />
          <Route exact path="/auth/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
