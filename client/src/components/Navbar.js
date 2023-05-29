import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from '../auth';
import { useContext, useEffect } from 'react';
import {CartContext} from '../store/CartStore';
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from '../store/FavoriteStore';



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      padding: '0 4px',
      backgroundColor: '#7576ac',
      border: '2px solid #3c3c3c',
    },
  }));

  

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {auth} = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const {favorites} = useContext(FavoriteContext);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    console.log(auth.user);

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        auth.logoutUser();
    }


    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        navigate(`/products?search=${encodeURIComponent(searchText)}`);
    };



    useEffect(() => {  
    }, [auth.user]);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity,0);


    return(
        <div className="navbar">
            <div className="container">
                <div className="left">
                    <IconButton aria-label="more" className='button'>
                        <DehazeIcon onClick={handleOpenDropdown} />
                    </IconButton>
                    {
                    isOpen && (<div className="dropdown-content">
                        <Link to={'/products'} className='dropdown-item' onClick={handleOpenDropdown}>New Arrivals</Link>
                        <Link to={'/products/women'} onClick={handleOpenDropdown} className='dropdown-item'>Women</Link>
                        <Link to={'/products/men'} onClick={handleOpenDropdown} className='dropdown-item'>Men</Link>
                        <Link to={'/products/sale'} onClick={handleOpenDropdown} className='dropdown-item'>Sale</Link>
                    </div>)
                    }
                    <ul>
                        <li><Link to={'/products'} className='link'>New Arrivals</Link></li>
                        <li><Link to={'/products/women'} className='link'>Women</Link></li>
                        <li><Link to={'/products/men'} className='link'>Men</Link></li>
                        <li><Link to={'/products/sale'} className='link'>Sale</Link></li>
                    </ul>
                </div>
                <div className="center">
                    <Link to= {'/'} className="logo">Shop</Link>
                </div>
                <div className="right">
                    <div className="links">
                        <div className="search">
                            <input type="text" placeholder="Search for item..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleKeyPress}/>
                            <IconButton aria-label="search" className='buttons' onClick={handleSearch}>
                                <SearchIcon/>
                            </IconButton>
                        </div>
                        <Link to={"/wishlist"} className="linkcom">
                        <IconButton aria-label="favorite" className='buttons'>
                            <StyledBadge badgeContent={favorites.length} color="secondary">
                                <FavoriteBorderIcon />
                            </StyledBadge>
                        </IconButton>
                        </Link>
                        <Link to={"/cart"} className="linkcom">
                        <IconButton aria-label="cart" className='buttons' > 
                            <StyledBadge badgeContent={totalQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        </Link>
                        <IconButton aria-label="account" className='buttons' onClick={handleClick}>
                            <PersonIcon/>
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            {!auth.loggedIn?<Link to={"/login"} className="linkcom"><MenuItem onClick={handleClose}>Login</MenuItem></Link>:undefined}
                            {!auth.loggedIn?<Link to={"/register"} className="linkcom"><MenuItem onClick={handleClose}>Register</MenuItem></Link>:undefined}
                            {!auth.loggedIn?undefined:<Link to={"/update"} className="linkcom"><MenuItem onClick={handleClose}>Change Password</MenuItem></Link>}
                            {!auth.loggedIn?undefined:<MenuItem onClick={() => { handleLogout(); handleClose(); }} >Logout</MenuItem>}
                            {auth.user && auth.user.isAdmin?<Link to={"/admin"} className="linkcom"><MenuItem onClick={handleClose}>Admin</MenuItem></Link>:undefined}
                        </Menu>

                    </div>
                
                </div>
                
            </div>
        </div>
    )
}


export default Navbar;