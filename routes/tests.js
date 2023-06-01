var express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const getTest = [
    {
      title: 'GET test',
      description: 'Le test est réussi',
      additionalStuff: 'o/',
    },
  ]
  res.status(200).json(getTest)
})

router.post('/', (req, res, next) => {
  const postTest = [
    {
      title: 'POST test',
      description: 'Le test est réussi',
      additionalStuff: 'o/',
    },
  ]
  res.status(200).json(postTest)
})

module.exports = router
