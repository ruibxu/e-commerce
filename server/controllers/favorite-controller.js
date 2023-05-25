
const Favorite = require('../models/favorite-model');

createFavorite = async (req, res) => {
    try{
        const newFavorite = await Favorite.create(req.body);
        res.status(201).json({
            success: true,
            favorite: newFavorite
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

getUserFavorite = async (req, res) => {     
    try {
        const userFavorite = await Favorite.findOne({where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            favorite: userFavorite
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


updateFavorite = async (req, res) => {
    try{
        const updatedFavorite = await Favorite.update(req.body, {where: {userId: req.params.id}});
        res.status(200).json({
            success: true,
            favorite: updatedFavorite
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createFavorite,
    getUserFavorite,
    updateFavorite
}