import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./Search";
import Button from "@material-ui/core/Button";
import { sendLogoutRequest} from "../state/userLogin"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token=localStorage.getItem('token')
  const dispatch = useDispatch();
  //trampa mortal
  const history = useHistory()
  
  const logoutSubmit = (e)=>{
    e.preventDefault()
    dispatch(sendLogoutRequest())
    history.push("/comic")
  }
 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
              {token ? <><Button  onClick={logoutSubmit} variant="contained" color="secondary">
              <Link to="/login">Logout</Link>
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              <Link to="/cart">Carrito</Link>
            </Button>
            </> :<> <Button variant="contained" color="primary">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="contained" color="secondary">
              <Link to="/register">register</Link>
            </Button> </> } 
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              <Link to="/comics">Home</Link>
            </Button>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            E-COMICS
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}></div>
            <Search />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
