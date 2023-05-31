import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CartContext } from "../store/CartStore";
import { useContext, useEffect, useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import { FavoriteContext } from "../store/FavoriteStore";
import StripeCheckout from 'react-stripe-checkout';
import api from '../api'
import { useNavigate } from "react-router-dom";


const Cart = () => {
    const { cart, addToCart,clearItem,clearCart} = useContext(CartContext);
    const { favorites } = useContext(FavoriteContext);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const totalPrice= cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const totalQuantity= cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalwithShipping= totalPrice>=100? totalPrice: totalPrice+5.90;

    const stripeKey=process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    const disable= cart.length===0;
    
    useEffect(() => {
        const makeRequest = async () => {
            try{
                const response = await api.checkout({
                    tokenId: stripeToken.id,
                    amount: totalwithShipping*100,
                });
                if(response.data.success){
                    clearItem();
                    navigate('/success');
                }
            }
            catch(err){
                console.log(err);
            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, totalwithShipping, navigate]);




    return (
        <div>
            <Announcement />
            <Navbar />
            <div className="cart">
                <div className="cart-title">
                    <h1>YOUR BAG</h1>
                </div>
                <div className="cart-top">
                    <Link to={"/"}>
                        <button className="cart-top-button">CONTINUE SHOPPING</button>
                    </Link>

                    <div className="cart-top-texts">
                        <Link to={"/cart"} className="linkcom"><span className="cart-top-text">Shopping Bag ({totalQuantity})</span></Link>
                        <Link to={"/wishlist"} className="linkcom"><span className="cart-top-text">Your Wishlist ({favorites.length})</span></Link>
                    </div>
                </div>
                <div className="cart-bottom">
                    <div className="cart-bottom-info">
                    {cart? cart.map((item) => (
                            <Link to={`/product/${item.id}`} className="linkcom">
                            <div className="cart-bottom-product">
                                <div className="cart-bottom-product-info">
                                    <img src={item.image} alt="jean" className="cart-bottom-product-image"/>
                                    <div className="cart-bottom-product-info-detail">
                                        <span className="cart-bottom-product-name"><b>Product:</b> {item.name}</span>
                                        <span className="cart-bottom-product-id"><b>Product id:</b> {item.id}</span>
                                        <span className="cart-bottom-product-size"><b>Size:</b> {item.selectedSize}</span>
                                        <b>Color:</b>
                                        <div className="cart-bottom-product-color" style={{"background-color": item.selectedColor}}/>
                                    </div>
                                </div>
                                <div className="cart-bottom-product-amount">
                                    <div className="cart-bottom-product-amount-container">
                                        <AddIcon onClick={(e) => { e.preventDefault(); addToCart(item, item.selectedColor, item.selectedSize, 1); }} />
                                        <div className="cart-bottom-product-amount-number">
                                            {item.quantity}
                                        </div>
                                        <RemoveIcon onClick={(e) => { e.preventDefault();  addToCart(item, item.selectedColor, item.selectedSize, -1);}} />
                                        <ClearIcon onClick={(e) => { e.preventDefault();  clearItem(item);}} />
                                    </div>
                                    

                                    <div className="cart-bottom-product-price">
                                        $ {item.price * item.quantity}
                                    </div>
                                </div>
                        </div>
                        </Link>
                    )): undefined
                    
                            
                    }
                    </div>
                    <hr className="cart-bottom-hr"/>


                    <div className="cart-bottom-summary">
                        <div className="cart-bottom-summary-title">
                            ORDER SUMMARY
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Subtotal</span>
                            <span className="cart-bottom-summary-item-price">$ {totalPrice}</span>
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Estimated Shipping</span>
                            <span className="cart-bottom-summary-item-price">$ 5.90</span>
                        </div>
                        {totalPrice>= 100?                         
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Shipping Discount</span>
                            <span className="cart-bottom-summary-item-price">$ -5.90</span>
                        </div>
                        : undefined}

                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text" style={{"font-weight":"600" }}>Total</span>
                            <span className="cart-bottom-summary-item-price" style={{"font-weight":"600" }}>{totalwithShipping}</span>
                        </div>
                        <StripeCheckout
                            name="GoShop" 
                            billingAddress
                            shippingAddress
                            description={`Your total is $${totalwithShipping}`}
                            amount={totalwithShipping*100}
                            token={(token) => setStripeToken(token)}
                            stripeKey={stripeKey}
                        >
                        <button disabled={disable}className="cart-bottom-summary-button">CHECKOUT NOW</button>
                        </StripeCheckout>
                        
                    </div>


                </div>
            
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Cart;