const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/posts')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

const Post = require('../models/post')

// CREATE

// Add new post
app.post('/posts', (req, res) => {
  // var db = req.db
  const title = req.body.title
  const description = req.body.description
  const newPost = new Post({
    title: title,
    description: description
  })

  newPost.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error) }
    res.send({
      posts: posts
    })
  }).sort({ _id: -1 })
})

// app.get('/posts', (req, res) => {
//   res.send(
//     {
//       'posts': [{
//         title: 'Hello World!',
//         description: 'Hi there! How are you?'
//       }]
//     }

//   )
// })

app.listen(process.env.PORT || 8081)
