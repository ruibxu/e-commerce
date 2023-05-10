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

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);
    }



    return(
        <div className="navbar">
            <div className="container">
                <div className="left">
                    <IconButton aria-label="more" className='button'>
                        <DehazeIcon onClick={handleOpenDropdown} />
                    </IconButton>
                    {
                    isOpen && (<div className="dropdown-content">
                        <a onClick={handleOpenDropdown} className='dropdown-item' >New Arrivals</a>
                        <a onClick={handleOpenDropdown} className='dropdown-item'>Women</a>
                        <a onClick={handleOpenDropdown} className='dropdown-item'>Men</a>
                        <a onClick={handleOpenDropdown} className='dropdown-item'>Sale</a>
                    </div>)
                    }
                    <ul>
                        <li>New Arrivals</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Sale</li>
                    </ul>
                </div>
                <div className="center">
                    <span className="logo">
                        Logo
                    </span>
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
                        <IconButton aria-label="account" className='buttons'>
                            <PersonIcon/>
                        </IconButton>

                    </div>
                
                </div>
                
            </div>
        </div>
    )
}


export default Navbar;