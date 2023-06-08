const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String,  required: true },
      grade: { type: Number, required: true },
    }
  ],
  averageRating: { type: Number, required: true },
})

bookSchema.index({ 'ratings.userId': 1 }, { unique: false })

module.exports = mongoose.model('Book', bookSchema)

