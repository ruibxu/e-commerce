import Navbar from "../components/Navbar.js";
import Announcement from "../components/Announcement.js";
import Products from "../components/Products.js";
import Newsletter from "../components/Newsletter.js";
import Footer from "../components/Footer.js";
const ProductList = () =>{
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <div>
                <h1 className="title">Products</h1>
                <div className="filterContainer">
                    <div className="filter">
                        <div>Filter Products:</div>
                        <select name="category" className="dropdown">
                            <option disabled selected className="dropdown-item">Color</option>
                            <option className="dropdown-item">White</option>
                            <option className="dropdown-item">Black</option>
                            <option className="dropdown-item">Blue</option>
                            <option className="dropdown-item">Yellow</option>
                            <option className="dropdown-item">Green</option>
                        </select>
                        <select name="category" className="dropdown">
                            <option disabled selected className="dropdown-item">Gender</option>
                            <option className="dropdown-item">Women</option>
                            <option className="dropdown-item">Men</option>
                        </select>
                        <select name="category" className="dropdown">
                            <option selected className="dropdown-item">All</option>
                            <option className="dropdown-item">Sale</option>
                        </select>
                    </div>
                    <div className="filter">
                        <div>Sort Products:</div>
                        <select name="sort" className="dropdown">
                            <option selected className="dropdown-item">Newest</option>
                            <option  className="dropdown-item">Price (asc)</option>
                            <option  className="dropdown-item">Price (desc)</option>
                        </select>
                    </div>
                </div>
            </div>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default ProductList