import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

import { CartContext } from "../store/CartStore";
import { useContext } from "react";
import { FavoriteContext } from '../store/FavoriteStore';

const ProductItem = ({item}) => {
    const { cart, addToCart,clearItem} = useContext(CartContext);
    const {favorites, addToFavorites, removeFromFavorites} = useContext(FavoriteContext);
    return(
        <Link to={`/product/${item.id}`} className="product-item">
                <img src={item.image} className="product-img"/>
                <div className="product-buttons">
                    <IconButton className="product-button" onClick={(e) => { e.preventDefault(); addToCart(item, item.color[0], item.size[0], 1); }}>
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton className="product-button" onClick={(e) => { e.preventDefault(); addToFavorites(item); }}>
                        <FavoriteBorderOutlinedIcon/> 
                    </IconButton>
                </div>
                <div className="product-info">
                    <div className="product-name">{item.name}</div>
                    {item.categories.includes("sale")&&
                        <div className="product-original-price">${Number(item.price) + 10.00}</div> 
                    }
                    <div className="product-price">${item.price}</div>
                    
                </div>
        </Link>
    )


}


export default ProductItem;