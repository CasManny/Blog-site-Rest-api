const mongoose = require('mongoose')

const ConnectDB = async (url) => {
    return mongoose.connect(url)
}

module.exports = ConnectDB;