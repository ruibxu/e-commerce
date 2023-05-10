
const CategoryItem = ({item}) => {
    return(
        <div className="category-item">
            <img src={item.img} className="category-img"/>
            <div className="category-info">
                {item.title}
            </div>
        </div>
    )


}


export default CategoryItem;