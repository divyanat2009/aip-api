require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./logger')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const postsRouter = require('./posts/posts-router')
const bookmarksRouter = require('./bookmarks/bookmarks-router')
const multerUploads = require('./middleware/multer')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

//validate API_Token
/*app.use(function validateBearerToken(req, res, next){
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    if(!authToken || authToken.split(' ')[1] !== apiToken){
       logger.error(`Unauthorized request to path: ${req.path}`);
        return res.status(401).json({ error: 'Unauthorized request'})
    }
    next()
})*/

app.use('/api/users',usersRouter)
app.use('/api/posts',postsRouter)
app.use('/api/bookmarks',bookmarksRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to AIP!')
})
app.post('/api/upload', multerUploads, (req, res) => {
    const body = req.body
    console.log(req.body)
    console.log('req.file : ', req.file);
    res.status(201)
    //res.send(`req.body :' ${body}`)
    //console.log('req.body :', req.body);

});
app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV === 'production'){
        response = {error :{message:'server error'}}
    }
    else{
        console.error(error)
        response = { message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app