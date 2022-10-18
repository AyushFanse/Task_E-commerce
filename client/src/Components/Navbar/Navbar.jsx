import React, { useState, memo } from "react";
import {
    IconButton,
    Grid,
    Badge,
    Box,
    Typography,
    AppBar,
    Toolbar,
    MenuItem,
    Menu,
    Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    NavigateBefore,
    ShoppingCart,
    SearchTwoTone,
    AccountCircle,
    LogoutRounded,
    HomeRounded,
} from "@mui/icons-material";
import "./navbar.css";

const Navbar = memo(({ page, cart, search }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const history = useNavigate();

    //-------------------------------* NAVIGATION MENU STATE *-------------------------------//
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //-------------------------------* NAVIGATION MENU FUNCTIONS *-------------------------------//
    const Home = () => {
        history("/");
    };

    const Cart = () => {
        history("/cart");
    };

    return (
        <>
            <AppBar id="appbar">
                <Toolbar>
                    {page === "E-Commerce" ? null : (
                        <IconButton
                            onClick={() => {
                                history(-1);
                            }}
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <NavigateBefore
                                id="icons"
                                sx={{
                                    fontSize: "2rem",
                                    color: "white",
                                }}
                            />
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            flexGrow: 1
                        }}
                        id='navHeader'
                    >
                        {page}
                    </Box>
                    {page === "E-Commerce" ? (
                        <>
                            <div id="searchIconBar" sx={{ margin: 2 }}>
                                <div id="searchIconOut">
                                    <SearchTwoTone id="searchIcon" />
                                </div>
                                <input
                                    type="search"
                                    id="searchField"
                                    onChange={(e) => {
                                        search(
                                            e.currentTarget.value.toLowerCase()
                                        );
                                    }}
                                    placeholder={"Search…"}
                                />
                            </div>
                            &nbsp; &nbsp; &nbsp;
                        </>
                    ) : null}
                    {page === "Cart" ? null : (
                        <Tooltip title="Open Cart">
                            <IconButton onClick={Cart} sx={{ p: 1 }}>
                                <Badge badgeContent={cart} color="error">
                                    <ShoppingCart
                                        sx={{
                                            fontSize: "2rem",
                                            color: "white",
                                        }}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    )}
                    {page === "Error" ? null : (
                        <Box sx={{ margin: 1 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0, width: "45px" }}
                                >
                                    <AccountCircle
                                        sx={{
                                            fontSize: "2rem",
                                            color: "white",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem id="menuItemsOut">
                                    <Typography
                                        id="menuItemsUser"
                                        sx={{ fontFamily: "Montserrat" }}
                                    >
                                        Hi User
                                        <img
                                            className="wave"
                                            src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                                            alt=""
                                        />
                                    </Typography>
                                </MenuItem>
                                {page === "E-Commerce" ? null : (
                                    <MenuItem id="menuItemsOut" onClick={Home}>
                                        <HomeRounded id="menuItemsIcon" />
                                        &nbsp; &nbsp;
                                        <Typography id="menuItems">
                                            Home
                                        </Typography>
                                    </MenuItem>
                                )}
                                {page === "Cart" ? null : (
                                    <MenuItem id="menuItemsOut" onClick={Cart}>
                                        <ShoppingCart id="menuItemsIcon" />
                                        &nbsp; &nbsp;
                                        <Typography id="menuItems">
                                            Cart
                                        </Typography>
                                    </MenuItem>
                                )}
                                <MenuItem id="menuItemsOut">
                                    <LogoutRounded id="menuItemsIcon" /> &nbsp;
                                    &nbsp;
                                    <Typography id="menuItems">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
                {page === "E-Commerce" ? (
                    <>
                        <Grid id="SearchBarForMd">
                            <div id="searchIconBarForMd" sx={{ margin: 1 }}>
                                <div id="searchIconOutForMd">
                                    <SearchTwoTone id="searchIcon" />
                                </div>
                                <input
                                    type="search"
                                    id="searchFieldForMd"
                                    onChange={(e) => {
                                        search(
                                            e.currentTarget.value.toLowerCase()
                                        );
                                    }}
                                    placeholder={"Search…"}
                                />
                            </div>
                        </Grid>
                    </>
                ) : null}
            </AppBar>
        </>
    );
});

export default Navbar;
