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
import Box from '@mui/material/Box';
const ProductList = () =>{
    const location = useLocation();
    let cat = location.pathname.split("/")[2];
    const search = new URLSearchParams(location.search).get("search");
    cat =  cat? cat.split("-"): undefined;

    const [category, setCategory] = useState(cat);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");


    useEffect(() => {
        cat = location.pathname.split("/")[2];
        cat =  cat? cat.split("-"): undefined;
        setCategory(cat);
        setFilters({});
        setSort("newest");
    }, [location.pathname.split("/")[2]]);
    

    const handleFilters = (e) =>{
        const { name, value } = e.target;
        if (value === "All Colors" || value === "All Sizes") {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: undefined,
            }));
        }else{
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: value,
            }));
        }

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
                        <select name="color" className="dropdown" value={filters.color || ""} onChange={handleFilters}>
                            <option className="dropdown-item">All Colors</option>
                            <option className="dropdown-item">White</option>
                            <option className="dropdown-item">Black</option>
                            <option className="dropdown-item">Blue</option>
                            <option className="dropdown-item">Yellow</option>
                            <option className="dropdown-item">Green</option>
                            <option className="dropdown-item">Red</option>
                            <option className="dropdown-item">Pink</option>
                        </select>
                        <select name="size" className="dropdown" value={filters.size || ""} onChange={handleFilters}>
                            <option className="dropdown-item" >All Sizes</option>
                            <option className="dropdown-item">XS</option>
                            <option className="dropdown-item">S</option>
                            <option className="dropdown-item">M</option>
                            <option className="dropdown-item">L</option>
                            <option className="dropdown-item">XL</option>
                        </select>


                    </div>
                    <div className="filter">
                        <div>Sort Products:</div>
                        <select name="sort" className="dropdown" value={sort} onChange={handleSort}>
                            <option  className="dropdown-item" value="newest">Newest</option>
                            <option  className="dropdown-item" value="asc">Price (asc)</option>
                            <option  className="dropdown-item" value="desc">Price (desc)</option>
                        </select>
                    </div>
                </div>
            </div>
            <Products category={category} filters={filters} sort={sort} search={search} />
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default ProductList