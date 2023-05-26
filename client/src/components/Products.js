//import {products} from "../data";
import ProductItem from "./ProductItem";
import axios from "axios";
import {useEffect, useState} from "react";
import api from '../api'
const Products  = ({category,filters,sort}) => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () =>{
            try{
                const color= filters? filters.color: undefined;
                const size = filters? filters.size: undefined;
                const response = await api.getProducts(
                    {
                        category:category,
                        color:color,
                        size:size,
                        sort:sort
                    }
                );
                setProducts(response.data.products);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[category,filters,sort]);

    /*
    useEffect(() => {
        category &&
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
    }, [products, category, filters]);
    */
                

    return(
        <div className="products">
            <div className="container">
            {category
            ? products.map((item) => <ProductItem item={item} key={item.id} />)
            : products
            .slice(0, 10)
            .map((item) => <ProductItem item={item} key={item.id} />)}
            </div>
        </div>
    )
}

export default Products;