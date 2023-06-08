const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const rateCtrl = require('../controllers/rating')

router.get('/', rateCtrl.getAllBook)
router.post('/', auth, rateCtrl.createBook)

module.exports = router

