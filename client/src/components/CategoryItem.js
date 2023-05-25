import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryItem = ({item}) => {
    const link = `/products/${item.gender}/${item.category}`;
    
    return(
        <div className="category-item">
            <Link to={link}  className="category-link">
                <img src={item.image} className="category-img"/>
                <div className="category-info">
                    {item.title}
                </div>
            </Link>
        </div>
    )


}


export default CategoryItem;