import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
const Cart = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <div className="cart">
                <div className="cart-title">
                    <h1>YOUR BAG</h1>
                </div>
                <div className="cart-top">
                    <button className="cart-top-button">CONTINUE SHOPPING</button>
                    <div className="cart-top-texts">
                        <span className="cart-top-text">Shopping Bag (2)</span>
                        <span className="cart-top-text">Your Wishlist (0)</span>
                    </div>
                    <button className="cart-top-button">CHECKOUT NOW</button>
                </div>
                <div className="cart-bottom">

                    <div className="cart-bottom-info">

                        <div className="cart-bottom-product">
                            <div className="cart-bottom-product-info">
                                <img src="https://www.prada.com/content/dam/pradanux_products/G/GEP/GEP178/1P8QF0008/GEP178_1P8Q_F0008_S_161_SLF.png/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg" alt="jean" className="cart-bottom-product-image"/>
                                <div className="cart-bottom-product-info-detail">
                                    <span className="cart-bottom-product-name"><b>Product:</b> Jean</span>
                                    <span className="cart-bottom-product-id"><b>Product id:</b> 12319361</span>
                                    <span className="cart-bottom-product-size"><b>Size:</b> XS</span>
                                    <b>Color:</b>
                                    <div className="cart-bottom-product-color" style={{"background-color": "black"}}/>
                                </div>
                            </div>
                            <div className="cart-bottom-product-amount">
                                <div className="cart-bottom-product-amount-container">

                                    < AddIcon/>
                                    <div className="cart-bottom-product-amount-number">
                                        2
                                    </div>
                                    <RemoveIcon/>
                                </div>
                                <div className="cart-bottom-product-price">
                                    $20
                                </div>   
                                
                            </div>
                        </div>

                    </div>
                    <hr className="cart-bottom-hr"/>


                    <div className="cart-bottom-summary">
                        <div className="cart-bottom-summary-title">
                            ORDER SUMMARY
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Subtotal</span>
                            <span className="cart-bottom-summary-item-price">$ 80</span>
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Estimated Shipping</span>
                            <span className="cart-bottom-summary-item-price">$ 5.90</span>
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text">Shipping Discount</span>
                            <span className="cart-bottom-summary-item-price">$ -5.90</span>
                        </div>
                        <div className="cart-bottom-summary-item">
                            <span className="cart-bottom-summary-item-text" style={{"font-weight":"600" }}>Total</span>
                            <span className="cart-bottom-summary-item-price" style={{"font-weight":"600" }}>$ 80</span>
                        </div>
                        <button className="cart-bottom-summary-button">CHECKOUT NOW</button>
                    </div>


                </div>
            
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Cart;