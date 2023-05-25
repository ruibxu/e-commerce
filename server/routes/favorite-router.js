const express = require('express')
const router = express.Router()
const favoriteController = require('../controllers/favorite-controller')
const auth = require('../auth/authManager')

router.post('/',auth.verify, favoriteController.createFavorite)
router.get('/:id',auth.verify, favoriteController.getUserFavorite)
router.put('/:id',auth.verify, favoriteController.updateFavorite)

module.exports = router