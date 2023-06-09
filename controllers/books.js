const Book = require('../models/modBook')
const fs = require('fs')

// TODO: test inputs!

exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book)
  delete bookObject._id

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  })

  book.save()
    .then(() => {
      res.status(201).json({ message: 'Livre enregistré !' })
    })
    .catch(error => {
      res.status(400).json({ error: error.message })
    })
}

exports.getOneBook = (req, res) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )
}

exports.modifyBook = (req, res) => {
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
    averageRating: req.body.averageRating
  })
  Book.updateOne({_id: req.params.id}, book).then(
    () => {
      res.status(201).json({
        message: 'Book updated successfully!'
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.deleteBook = (req, res) => {
  const bookId = req.params.id

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' })
      }

      const imageUrl = book.imageUrl
      const filename = imageUrl.split('/').pop()
      const filePath = `./images/${filename}`

      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error)
          return res.status(500).json({ error: 'Failed to delete file.' })
        }

        Book.deleteOne({ _id: bookId })
          .then(() => {
            res.status(200).json({
              message: 'Book deleted!'
            })
          })
          .catch((error) => {
            res.status(400).json({
              error: error
            })
          })
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.getAllBook = (req, res) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books)
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.setBookRating = (req, res) => {
  const { id } = req.params
  const { userId, rating } = req.body

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 0 and 5.' })
  }

  Book.findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' })
      }

      const existingRating = book.ratings.find((rating) => rating.userId === userId)

      if (existingRating) {
        return res.status(400).json({ error: 'This user has already rated this book.' })
      }

      book.ratings.push({ userId, grade: rating })

      const totalRatings = book.ratings.length
      const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0)
      const averageRating = sumRatings / totalRatings

      book.averageRating = averageRating

      book.save()
        .then((updatedBook) => {
          res.status(200).json(updatedBook)
        })
        .catch((error) => {
          res.status(400).json({ error })
        })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.getBestRating = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => {
      res.status(200).json(books)
    })
    .catch(error => {
      res.status(400).json(error)
    })
}

