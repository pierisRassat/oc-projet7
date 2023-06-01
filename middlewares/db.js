const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fmd:C3STunemaisonbleu@clusterfmd0.vlbkprd.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('db is connected!'))
  .catch(() => console.log('db connection failed dude!'))

