import './style/App.scss';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  createBrowserRouter,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';



function App() {

  return ( 
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
