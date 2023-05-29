import React, { createContext, useState, useEffect} from "react";


const CartContext = createContext();


function CartContextProvider(props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(storedCart);
    
    if (parsedCart?.length) {
      setCart(parsedCart);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color, size, quantity) => {
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size
    );
  
    const updatedCart = [...cart];
  
    if (existingProductIndex !== -1) {
      const newQuantity = updatedCart[existingProductIndex].quantity + quantity;
      if (newQuantity <= 0) {
        updatedCart.splice(existingProductIndex, 1); // Remove the item from the cart
      } else {
        updatedCart[existingProductIndex].quantity = newQuantity;
      }
    } 
    else {
      updatedCart.push({
        ...product,
        quantity,
        selectedColor: color,
        selectedSize: size,
      });
    }
    setCart(updatedCart);

  };


  const clearItem= (item) => {
    const existingProductIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedColor === item.selectedColor &&
        cartItem.selectedSize === item.selectedSize
    );
    const updatedCart = [...cart];
    updatedCart.splice(existingProductIndex, 1); // Remove the item from the cart
    setCart(updatedCart);
  };

  const clearCart= (cart) => {
    setCart([]);

  }



  return (
    <CartContext.Provider value={{ cart, addToCart ,clearItem, clearCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };