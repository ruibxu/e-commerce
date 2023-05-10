import {category, category2} from "../data";
import CategoryItem from "./CategoryItem";
const Categories = () => {

    return(
        <div className="section">

            <div className="title">
                Women
            </div>
            <div className="categories">
                {category.map((item) => (
                    <CategoryItem item={item}/>
                ))}
            </div>

            <div className="title">
                Men
            </div>
            <div className="categories">
                {category2.map((item) => (
                    <CategoryItem item={item} />
                ))}
            </div>

        </div>
    )

}


export default Categories;