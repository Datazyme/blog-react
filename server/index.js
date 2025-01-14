const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')

const app = express();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
//connects to local host of client folder
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'))

//routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 8000, () => console.log(`listening on 
port ${process.env.PORT}`))).catch(error => {console.log(error)})

// "main": "index.js",