const mongoose = require('mongoose');

async function connect() {
    return mongoose.connect('mongodb+srv://arnav:arnav123@cluster0.nnbtmu1.mongodb.net/shorturl');
}
module.exports = connect;