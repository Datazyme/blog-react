const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes.jsx')
const postRoutes = require('./routes/postRoutes.jsx')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.jsx')

const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
//connects to local host of client folder
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI).then(app.listen(8000, () => console.log(`listening on 
port ${process.env.PORT}`))).catch(error => {console.log(error)})
