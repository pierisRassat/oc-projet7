const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const imageOptimizerMiddleware = async (req, res, next) => {
  if (req.file) {
    try {
      const originalName = req.file.originalname
      const lastDotIndex = originalName.lastIndexOf('.')
      const filenameWithoutExtension = originalName.substring(0, lastDotIndex)
      const timestamp = Date.now()
      const convertedFilename = `${filenameWithoutExtension}_${timestamp}.webp`
      const destination = req.file.destination
      const convertedFilePath = path.join(destination, convertedFilename)

      await sharp(req.file.path)
        .toFormat('webp')
        .webp({ quality: 80 })
        .resize(500)
        .toFile(convertedFilePath)

      req.file.filename = convertedFilename
      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.error( error)
        }
      })

      next()
    } catch (error) {
      res.status(400).json({ error: 'Error during image optimization!' })
    }
  } else {
    next()
  }
}

module.exports = imageOptimizerMiddleware

