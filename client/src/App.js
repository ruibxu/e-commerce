import './style/App.scss';
import {
  BrowserRouter,
  RouterProvider,
  Route,
  createBrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import {AuthContextProvider} from './auth';
import Update from './pages/Update';


function App() {
  const user = false;
  return ( 
    <BrowserRouter>
      <AuthContextProvider>
        <div className="app">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={ user ? <Navigate replace to="/"/> : <Login/>}/>
              <Route path="/register" element = { user ? <Navigate replace to="/"/>  : <Register/>}/>
              <Route path="/update" element={<Update/>}/>
              <Route path="/products/:category?" element={<ProductList/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
