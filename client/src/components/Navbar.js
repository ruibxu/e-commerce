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

    useEffect(() => {  
    }, [auth.user]);


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
                    <Link to= {'/'} className="logo">Logo</Link>
                </div>
                <div className="right">
                    <div className="links">
                        <div className="search">
                            <input type="text" placeholder="Search for item..."/>
                            <IconButton aria-label="search" className='buttons'>
                                <SearchIcon/>
                            </IconButton>
                        </div>
                        <IconButton aria-label="favorite" className='buttons'>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton aria-label="cart" className='buttons' > 
                            <StyledBadge badgeContent={4} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
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
                        </Menu>

                    </div>
                
                </div>
                
            </div>
        </div>
    )
}


export default Navbar;