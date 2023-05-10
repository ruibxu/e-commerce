import {products} from "../data";
import ProductItem from "./ProductItem";
const Products  = () => {
    return(
        <div className="products">
            <div className="container">
                {products.map((item) => (
                    <ProductItem item={item}/>
                ))}   
            </div>
        </div>
    )
}

export default Products;