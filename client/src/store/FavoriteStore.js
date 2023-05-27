import React, { createContext, useState, useEffect} from "react";


const FavoriteContext = createContext();

function FavoriteContextProvider(props) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        const parsedFavorites = JSON.parse(storedFavorites);
        
        if (parsedFavorites?.length) {
            setFavorites(parsedFavorites);
        }
    }
    , []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    , [favorites]);

    const addToFavorites = (product) => {
        const existingProductIndex = favorites.findIndex(
            (item) =>
            item.id === product.id
        );
        const updatedFavorites = [...favorites];
        if (existingProductIndex == -1) {
            updatedFavorites.push({
                ...product,
            });
        }
        setFavorites(updatedFavorites);
    }

    const removeFromFavorites =(item) => {
        const existingProductIndex = favorites.findIndex(
            (cartItem) =>
            cartItem.id === item.id
        );
        const updatedFavorites = [...favorites];
        if (existingProductIndex !== -1) {
            updatedFavorites.splice(existingProductIndex, 1); // Remove the item from the cart
        } 
        setFavorites(updatedFavorites);
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {props.children}
        </FavoriteContext.Provider>
    );

}

export { FavoriteContext, FavoriteContextProvider };
