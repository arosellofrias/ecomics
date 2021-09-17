import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import Button from "@material-ui/core/Button";
import { sendLogoutRequest } from "../state/userLogin";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    display: "flex",
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(0),
    paddingLeft: theme.spacing(18),
  },
  title: {
    justifyContent: "center",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    paddingRight: theme.spacing(8),
    paddingBottom: theme.spacing(2),
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "20%",
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
    paddingBottom: theme.spacing(3),
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
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  //trampa mortal
  const history = useHistory();

  const logoutSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLogoutRequest());
    Swal.fire({
      title: `Vuelva prontos`,
      text: `gracias por visitarnos`,
      icon: "success",
      timer: "2000",
    });
    history.push("/comics");
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    history.push("/comic");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {token ? (
                <>
                  {JSON.parse(user).privilegios === true ? (
                    <>
                      {" "}
                      <Link to="/admin">
                        <Button
                          variant="contained"
                          color="primary"
                          href="#contained-buttons"
                        >
                          Admin
                        </Button>
                      </Link>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                  <Link to="/comics">
                    <Button
                      onClick={logoutSubmit}
                      variant="contained"
                      color="secondary"
                    >
                      Logout
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button
                      variant="contained"
                      color="primary"
                      href="#contained-buttons"
                    >
                      Carrito
                    </Button>
                  </Link>
                  <Link to="/order">
                    <Button
                      variant="contained"
                      color="primary"
                      href="#contained-buttons"
                    >
                      Órdenes
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/login">
                    <Button variant="contained" color="primary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained" color="secondary">
                      register
                    </Button>
                  </Link>{" "}
                </>
              )}
              <Link to="/comics">
                <Button
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Home
                </Button>
              </Link>
              <Link to="/category">
                <Button
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Categorías
                </Button>
              </Link>
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
    </>
  );
}
