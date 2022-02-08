require("dotenv").config();
const express = require("express");
const ConnectDB = require("./db/connect");
const app = express();
const multer = require('multer')


const authRoute = require('./routes/auth')
const userRoute = require('./routes/Users')
const postRoute = require('./routes/Posts')
const categoriesRoute = require('./routes/Category')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
   
    res.status(200).json('file has been uploaded')
})

app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories',categoriesRoute)

const PORT = process.env.PORT || 5000;






const start = async () => {
    try {
        await ConnectDB(process.env.MONGO_URL)
        app.listen(PORT, () =>
          console.log(`Server is listening on port http://localhost:${PORT}`)
        );
        
    } catch (error) {
        console.log(error)
    }

}

start()
