import Navbar from "../components/Navbar.js";
import Announcement from "../components/Announcement.js";
import Products from "../components/Products.js";
import Newsletter from "../components/Newsletter.js";
import Footer from "../components/Footer.js";
import { useLocation , useNavigate,useMatch  } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProductList = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const saleMatch = useMatch("/products/sale");
    let sale;
    let gender;
    if(saleMatch){
        sale =(location.pathname.split("/")[2]);
    }
    else{
        gender=(location.pathname.split("/")[2]);
    }
    const category=(location.pathname.split("/")[3]);
    

    const [filters, setFilters] = useState({});
    console.log(filters);
    const [sort, setSort] = useState("newest");

    
    const handleFilters = (e) =>{
        let value;
        if( e.target.name === "color"|| e.target.name === "size"){
            value = e.target.value;
        }
        else{
            value = e.target.value.toLowerCase();
        }
        
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    const handleSort = (e) =>{
        setSort(e.target.value);
    };


    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div>
                <h1 className="title">Products</h1>
                <div className="filterContainer">
                    <div className="filter">
                        <div>Filter Products:</div>
                        <select name="color" className="dropdown" onChange={handleFilters}>
                            <option disabled selected className="dropdown-item" >Color</option>
                            <option className="dropdown-item">White</option>
                            <option className="dropdown-item">Black</option>
                            <option className="dropdown-item">Blue</option>
                            <option className="dropdown-item">Yellow</option>
                            <option className="dropdown-item">Green</option>
                        </select>
                        <select name="size" className="dropdown" onChange={handleFilters}>
                            <option disabled selected className="dropdown-item" >Size</option>
                            <option className="dropdown-item">XS</option>
                            <option className="dropdown-item">S</option>
                            <option className="dropdown-item">M</option>
                            <option className="dropdown-item">L</option>
                            <option className="dropdown-item">XL</option>
                        </select>
                        {
                        gender?undefined:
                        <select name="gender" className="dropdown" onChange={handleFilters}>
                            <option selected className="dropdown-item" >Gender</option>
                            <option className="dropdown-item">Women</option>
                            <option className="dropdown-item">Men</option>
                        </select>
                        }

                        {
                        category?undefined:
                        <select name="category" className="dropdown" onChange={handleFilters}>
                            <option selected className="dropdown-item" >Category</option>
                            <option className="dropdown-item">Jackets</option>
                            <option className="dropdown-item">Botton</option>
                            <option className="dropdown-item">Shoes</option>
                        </select>
                        }

                        {
                        sale?undefined:
                            <select name="sale" className="dropdown" onChange={handleFilters}>
                                <option selected className="dropdown-item" >All</option>
                                <option className="dropdown-item" >Sale</option>
                            </select>
                        }



                    </div>
                    <div className="filter">
                        <div>Sort Products:</div>
                        <select name="sort" className="dropdown" onChange={handleSort}>
                            <option selected className="dropdown-item" value="newest">Newest</option>
                            <option  className="dropdown-item" value="asc">Price (asc)</option>
                            <option  className="dropdown-item" value="desc">Price (desc)</option>
                        </select>
                    </div>
                </div>
            </div>
            <Products gender={gender} category={category} sale={sale} filters={filters} sort={sort} />
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default ProductList