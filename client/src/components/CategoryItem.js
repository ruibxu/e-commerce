import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryItem = ({item}) => {
    
    return(
        <div className="category-item">
            <Link to={`/products/${item.category.join('-')}`} className="category-link">
                <img src={item.image} className="category-img"/>
                <div className="category-info">
                    {item.title}
                </div>
            </Link>
        </div>
    )


}


export default CategoryItem;