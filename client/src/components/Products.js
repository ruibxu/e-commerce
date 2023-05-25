import {products} from "../data";
import ProductItem from "./ProductItem";
import axios from "axios";
import {useEffect, useState} from "react";
import api from '../api'
const Products  = ({gender,category,filters,sort}) => {

    const [products,setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () =>{
            try{
                const fitlers={
                    gender: gender? gender : filters.gender,
                    category: category? category : filters.category,
                    color: filters.color,
                    size: filters.size,
                }
                const response = await api.getProducts(filters);
                setProducts(response.data.products);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[category]);

                    


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