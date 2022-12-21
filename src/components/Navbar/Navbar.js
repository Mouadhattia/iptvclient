import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../store/categorySlice";
import { getCartTotal } from "../../store/cartSlice";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { List, ListItem } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LogoutIcon from "@mui/icons-material/Logout";
import Editprofile from "../modals/Editporfile";
import { auth, logOut } from "../../store/authSlice";
import { fetchProducts } from "../../store/productSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { data:current } =useSelector((state) => state.auth);
  const [profile, setProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEditProfile = () => {
    setProfile(true);
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    dispatch(auth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MUI
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleSearch=(e)=>{
  e.preventDefault()
  dispatch(fetchProducts({search:search,userName:current.userName}))
}
  const handleLogout =()=>{
    dispatch(logOut())
    setOpen(false);
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <nav className="navbar" onClick={open === true ? handleClose : null}>
      <Editprofile open={profile} setOpen={setProfile} current ={current}  />
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">YOUR</span>
              <span className="text-gold"> LOGO</span>
            </Link>

            <form className="navbar-search flex">
              <input type="text" placeholder="Search here ..."  onChange={(e)=>setSearch(e.target.value)}/>
              <button type="submit" className="navbar-search-btn" onClick={(e)=>handleSearch(e)}>
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="navbar-btns">
              <div className="product-item-price text-regal-green fw-7 fs-18" style={{fontSize:"15px"}}>
                <span  style={{color:"black",fontSize:"14px" ,marginRight:"4px" }} > SOLDE:</span>  {current.balance} DT
              </div>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                onClick={handleClickOpen}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={current.avatar}
                />
              </StyledBadge>

              {open && (
                <div className="dropdown">
                  <List className="dropdown_list">
                    <div className="list-item">
                      <ListItem button onClick={handleEditProfile}>
                        <Person2Icon
                          size="medium"
                          sx={{ marginRight: "5px" }}
                        />
                        Profile
                      </ListItem>
                    </div>
                    <div className="list-item">
                      <Link to="/cart" className="add-to-cart-btn flex">
                        <ListItem button onClick={handleClose}>
                          <ManageHistoryIcon sx={{ marginRight: "5px" }} />
                          Paramètre
                        </ListItem>
                      </Link>
                    </div>
                    <div className="list-item">
                      <ListItem button onClick={handleLogout}>
                        <LogoutIcon sx={{ marginRight: "5px" }} />
                        Déconnecter
                      </ListItem>
                    </div>
                  </List>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <ul
              className={`nav-links flex ${
                isSidebarOpen ? "show-nav-links" : ""
              }`}
            >
              <button
                type="button"
                className="navbar-hide-btn text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.name}`}
                    className="nav-link text-white"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="navbar-show-btn text-gold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
