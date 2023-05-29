import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState, useContext} from 'react';
import api from '../api';
import DialogBox from "../components/DialogBox";
import AuthContext from '../auth';
import { Navigate } from 'react-router-dom';


const Admin = () => {
    const {auth} = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState(null);
    
    if(!auth.user||!auth.user.isAdmin){
        return <Navigate replace to="/"/>;
    }
    

    const handleClick = (text) => {
        setSelectedOption(text);
    }

    const renderComponent = () => {
        switch (selectedOption) {
          case 'Add Product':
            return <ADD_PRODUCT />;
          case 'Update Product':
            return <UPDATE_PRODUCT />;
          case 'Delete Product':
            return <DELETE_PRODUCT />;
          default:
            return null;
        }
      };
    return(
        <div className="admin">
            <h1 className="admin-title">Admin</h1>  
            <div className="admin-container">
                <List className="admin-list">
                    {['Add Product', 'Update Product', 'Delete Product',].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleClick(text)}>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <div className="admin-workspace">
                    {renderComponent()}
                </div>
            </div>

        </div>

        
    )

}

const ADD_PRODUCT = () =>{
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        categories: [],
        size: [],
        color: []
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categories' || name === 'size' || name === 'color') {
            setProductData({ ...productData, [name]: value.split(',') });
        }
        else{
            setProductData({ ...productData, [name]: value });
        }
    };


    const handleOpenDialog = (title,errorMessage) => {
        setErrorMessage(errorMessage);
        setDialogTitle(title);
    };
    
    const handleCloseDialog = () => {
        setErrorMessage('');
        setDialogTitle('');
    };

    const handleAddProduct = async (e) => { 
        e.preventDefault();
        if (!productData.name){
            handleOpenDialog("ERROR","Product name is required!");
            return;
        }
        if (!productData.description){
            handleOpenDialog("ERROR","Product description is required!");
            return;
        }
        if (!productData.price){
            handleOpenDialog("ERROR","Product price is required!");
            return;
        }
        if (!productData.image){
            handleOpenDialog("ERROR","Product image is required!");
            return;
        }
        try{
            const response = await api.createProduct(productData);
            
            if (response.status === 201) {
                handleOpenDialog("SUCCESS","Product added successfully!");
                setProductData({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    categories: [],
                    size: [],
                    color: []
                });
            }

        }catch(err){
            handleOpenDialog("ERROR",err.response.data.message);
        }
    }

    return(
        <div>
        <h3 className="admin-part-title">Add New Product</h3>
        <form className="admin-part-form">
            <label>Product Name</label>
            <input type="text" name="name" value={productData.name} onChange={handleInputChange}/>
            <label>Product Description</label>
            <input type="text" name="description" value={productData.description} onChange={handleInputChange}/>
            <label>Product Price</label>
            <input type="text" name="price" value={productData.price} onChange={handleInputChange}/>
            <label>Product Image</label>
            <input type="text" name="image" value={productData.image} onChange={handleInputChange}/>
            <label>Product Categories(separate categories by ,)</label>
            <input type="text" name="category" value={productData.category} onChange={handleInputChange}/>
            <label>Product Size(separate sizes by ,)</label>
            <input type="text" name="size" value={productData.size} onChange={handleInputChange}/>
            <label>Product Color(separate colors by ,)</label>
            <input type="text" name="color" value={productData.color} onChange={handleInputChange}/>
            <button type="submit" onClick={handleAddProduct}>Add Product</button>
        </form>
        <DialogBox diaglogTitle={dialogTitle} errorMessage={errorMessage} onClose={handleCloseDialog} />
    </div>
    );
}


const UPDATE_PRODUCT = () =>{
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        categories: [],
        size: [],
        color: []
        });

    const [productId, setProductId] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categories' || name === 'size' || name === 'color') {
            setProductData({ ...productData, [name]: value.split(',') });
        }
        else{
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleChangeId = (e) => {
        const { value } = e.target;
        setProductId(value);
    }


    const handleOpenDialog = (title,errorMessage) => {
        setErrorMessage(errorMessage);
        setDialogTitle(title);
    }

    const handleCloseDialog = () => {
        setErrorMessage('');
        setDialogTitle('');
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try{
            const updatedData = Object.fromEntries(
                Object.entries(productData).filter(([key, value]) => value !== ''&& value !== [])
            );
            const response = await api.updateProduct(productId,updatedData);
            if (response.status === 200) {
                handleOpenDialog("SUCCESS","Product updated successfully!");
                setProductData({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    categories: [],
                    size: [],
                    color: []
                });
            }
        }catch(err){
            handleOpenDialog("ERROR",err.response.data.message);
        }
    }

    return(
        <div>
            <h3 className="admin-part-title">Update Product</h3>
            <form className="admin-part-form">
                <label>Product ID</label>
                <input type="text" name="id" value={productId} onChange={handleChangeId}/>
                <label>Product Name</label>
                <input type="text" name="name" value={productData.name} onChange={handleInputChange}/>
                <label>Product Description</label>
                <input type="text" name="description" value={productData.description} onChange={handleInputChange}/>
                <label>Product Price</label>
                <input type="text" name="price" value={productData.price} onChange={handleInputChange}/>
                <label>Product Image</label>
                <input type="text" name="image" value={productData.image} onChange={handleInputChange}/>
                <label>Product Categories(separate categories by ,)</label>
                <input type="text" name="category" value={productData.category} onChange={handleInputChange}/>
                <label>Product Size(separate sizes by ,)</label>
                <input type="text" name="size" value={productData.size} onChange={handleInputChange}/>
                <label>Product Color(separate colors by ,)</label>
                <input type="text" name="color" value={productData.color} onChange={handleInputChange}/>
                <button type="submit" onClick={handleUpdateProduct}>Update Product</button>
            </form>
            <DialogBox diaglogTitle={dialogTitle} errorMessage={errorMessage} onClose={handleCloseDialog} />
        </div>
    );
}



const DELETE_PRODUCT = (e) =>{
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");

    const [productId, setProductId] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductId(value);
    };

    const handleOpenDialog = (title,errorMessage) => {
        setErrorMessage(errorMessage);
        setDialogTitle(title);
    }

    const handleCloseDialog = () => {
        setErrorMessage('');
        setDialogTitle('');
    }

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        if(productId === '') return handleOpenDialog("ERROR","Please enter product id")
        try{
            const response = await api.deleteProduct(productId);
            if (response.status === 200) {
                handleOpenDialog("SUCCESS","Product deleted successfully!");
                setProductId('');
            }
        }catch(err){
            handleOpenDialog("ERROR",err.response.data.message);
        }
    }

    return(
        <div>
            <h3 className="admin-part-title">Delete Product</h3>
            <form className="admin-part-form">
                <label>Product ID</label>
                <input type="text" name="id" value={productId} onChange={handleInputChange}/>
                <button type="submit" onClick={handleDeleteProduct}>Delete Product</button>
            </form>
            <DialogBox diaglogTitle={dialogTitle} errorMessage={errorMessage} onClose={handleCloseDialog} />
        </div>
    );

}

    

export default Admin;