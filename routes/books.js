const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const bookCtrl = require('../controllers/books')

router.get('/', bookCtrl.getAllBook)
router.post('/', multer, auth, bookCtrl.createBook)
router.get('/:id', bookCtrl.getOneBook)
router.put('/:id', multer, auth, bookCtrl.modifyBook)
router.delete('/:id', auth, bookCtrl.deleteBook)

module.exports = router

