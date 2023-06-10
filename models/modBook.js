const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  userId: { type: String, minlength: 1, required: true },
  title: { type: String, minlength: 1, required: true },
  author: { type: String, minlength: 1, required: true },
  imageUrl: { type: String, minlength: 1 },
  year: { type: Number, minlength: 1, required: true },
  genre: { type: String, minlength: 1,  required: true },
  ratings: [
    {
      userId: { type: String, minlength: 1, required: true },
      grade: { type: Number, min: 0, max: 5, required: true },
    }
  ],
  averageRating: { type: Number, min: 0, max: 5, required: true },
})

module.exports = mongoose.model('Book', bookSchema)

