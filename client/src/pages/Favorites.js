import React, {useContext} from 'react';
import { FavoriteContext } from '../store/FavoriteStore';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/CartStore';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ClearIcon from '@mui/icons-material/Clear';


const Favorites = () =>{
    const {favorites,removeFromFavorites} = useContext(FavoriteContext);
    const {cart} = useContext(CartContext);
    const cartTotalQuantity= cart.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <div>
            <Announcement />
            <Navbar />
            <div className="cart">
                <div className="cart-title">
                    <h1>YOUR WISHLIST</h1>
                </div>
                <div className="cart-top">
                    <Link to={"/"}>
                        <button className="cart-top-button">CONTINUE SHOPPING</button>
                    </Link>

                    <div className="cart-top-texts">
                        <Link to={"/cart"} className="linkcom"><span className="cart-top-text">Shopping Bag ({cartTotalQuantity})</span></Link>
                        <Link to={"/wishlist"} className="linkcom"><span className="cart-top-text">Your Wishlist ({favorites.length})</span></Link>
                    </div>
                </div>
                <div className="cart-bottom">
                    <div className="cart-bottom-info">
                    {favorites? favorites.map((item) => (
                            <Link to={`/product/${item.id}`} className="linkcom">
                            <div className="cart-bottom-product">
                                <div className="cart-bottom-product-info">
                                    <img src={item.image} alt="product-image" className="cart-bottom-product-image"/>
                                    <div className="cart-bottom-product-info-detail">
                                        <span className="cart-bottom-product-name"><b>Product:</b> {item.name}</span>
                                        <span className="cart-bottom-product-id"><b>Product id:</b> {item.id}</span>
                                    </div>
                                </div>
                                <div className="cart-bottom-product-amount">
                                <div className="cart-bottom-product-amount-container">
                                    <ClearIcon onClick={(e) => { e.preventDefault(); removeFromFavorites(item);}} />
                                </div>
                                    <div className="cart-bottom-product-price">
                                        $ {item.price}
                                    </div>
                                </div>
                            
                        </div>
                        </Link>
                    )): undefined
                            
                    }
                    </div>
                </div>
            
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Favorites
