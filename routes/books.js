const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const imageOptimizer = require('../middlewares/imageOptimizer')

const bookCtrl = require('../controllers/books')

router.get('/', bookCtrl.getAllBook)
router.get('/bestrating', bookCtrl.getBestRating)
router.post('/', auth, multer, imageOptimizer, bookCtrl.createBook)
router.get('/:id', bookCtrl.getOneBook)
router.put('/:id', auth, multer, bookCtrl.modifyBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.post('/:id/rating', auth, bookCtrl.setBookRating)

module.exports = router

