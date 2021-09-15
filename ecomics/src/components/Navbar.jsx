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
import { sendLogoutRequest } from "../state/userLogin";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Swal from 'sweetalert2'

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
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const token = localStorage.getItem("token");
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
      timer: "2000"
    })
    history.push("/comic");
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
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {token ? (
                <>
                  <Button
                    onClick={logoutSubmit}
                    variant="contained"
                    color="secondary"
                  >
                    <Link to="/login">Logout</Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                  >
                    <Link to="/cart">Carrito</Link>
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button variant="contained" color="primary">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="contained" color="secondary">
                    <Link to="/register">register</Link>
                  </Button>{" "}
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
              >
                <Link to="/comics">Home</Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                /* aria-haspopup="true" */
                onClick={handleToggle}
              >
                Categorias
              </Button>
              <div className={classes.root}>
                <div>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleClose}>
                                <Link to="/category/mangas">Mangas</Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Link to="/category/comics">Comics</Link>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
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
