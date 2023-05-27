import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation } from "react-router-dom";
import { useState , useEffect} from "react";
import api from '../api'
import { useContext } from "react";
import { CartContext } from "../store/CartStore";

const Product = () => {
    const location = useLocation();
    let productId = location.pathname.split("/")[2];
    const { cart, addToCart } = useContext(CartContext);

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");


    useEffect(() => {
        const defaultColor = product.color ? product.color[0] : "";
        const defaultSize = product.size ? product.size[0] : "";
        setColor(defaultColor);
        setSize(defaultSize);
      }, [product]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.getProductById(productId);
                console.log(response.data.product);
                setProduct(response.data.product);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [productId]);


    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, color, size, quantity);
    };

        
    


    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div className="product">
                <div className="product-image">
                    <img src={product.image} alt="product image" className="img"/>  
                </div>
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-description">
                    {product.description}
                    </p>
                    <span className="product-price">$ {product.price}</span>
                
                    <div className="product-filter-container">

                        <div className="product-filter">
                            <span className="product-filter-title" >Color</span>
                            {product.color?product.color.map((color) => (
                                <div style={{ "background-color": color }}  onClick={(e) => setColor(color)}  className="product-filter-color"></div>
                            )): undefined}
                        </div>

                        <div className="product-filter">
                            <span className="product-filter-title">Size</span>
                            <select className="product-filter-size" onChange={(e) => setSize(e.target.value)}>    
                                {product.size?product.size.map((size) => (
                                    <option>{size}</option>
                                )): undefined}
                            </select>
                        </div>

                    </div>

                    <div className="product-amount">
                        <div className="product-amount-container">
                            <RemoveIcon onClick={() => handleQuantity("dec")}/>
                            <div className="product-amount">
                                {quantity}
                            </div>
                            <AddIcon onClick={() => handleQuantity("inc")}/>
                        </div>
                        <button className="product-add" onClick={handleAddToCart}>ADD TO CART</button>
                    </div>
                             
                </div>
            </div>
            <Newsletter/>
            <Footer/>
        </div>
    );

}

export default Product;
