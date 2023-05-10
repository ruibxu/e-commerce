import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Product = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div className="product">
                <div className="product-image">
                    <img src="https://www.prada.com/content/dam/pradanux_products/G/GEP/GEP178/1P8QF0008/GEP178_1P8Q_F0008_S_161_SLF.png/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg" alt="jean" className="img"/>  
                </div>
                <div className="product-info">
                    <h1 className="product-name">Jean</h1>
                    <p className="product-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
                    </p>
                    <span className="product-price">$ 20</span>
                
                    <div className="product-filter-container">

                        <div className="product-filter">
                            <span className="product-filter-title">Color</span>
                            <div style={{ "background-color": "black" }} className="product-filter-color"></div>
                            <div style={{ "background-color": "white" }} className="product-filter-color"></div>
                            <div style={{ "background-color": "gray" }} className="product-filter-color"></div>
                        </div>

                        <div className="product-filter">
                            <span className="product-filter-title">Size</span>
                            <select className="product-filter-size">
                                <option>XS</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>

                    </div>

                    <div className="product-amount">
                        <div className="product-amount-container">
                            <RemoveIcon/>
                            <div className="product-amount">
                            1
                            </div>
                            <AddIcon/>
                        </div>
                        <button className="product-add">ADD TO CART</button>
                    </div>

                                                  
                </div>
            </div>
            <Newsletter/>
            <Footer/>
        </div>
    );

}

export default Product;
