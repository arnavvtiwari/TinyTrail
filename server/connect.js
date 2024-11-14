const mongoose = require('mongoose');

async function connect() {
    return mongoose.connect('mongodb://localhost:27017/shorturl');
}
module.exports = connect;