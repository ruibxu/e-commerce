import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
const ProductItem = ({item}) => {
    return(
        <div className="product-item">
            <img src={item.img} className="product-img"/>
            <div className="product-buttons">
                <IconButton className="product-button"><ShoppingCartOutlinedIcon/></IconButton>
                <IconButton className="product-button"><FavoriteBorderOutlinedIcon/></IconButton>
            </div>
            <div className="product-info">
                <div className="product-name">{item.name}</div>
                <div className="product-price">${item.price}</div>
            </div>
        </div>
    )


}


export default ProductItem;