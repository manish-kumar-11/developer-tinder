const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://namastedev:H5dMlHEhlCEmOrPJ@namastenode.f4v8jbg.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode/devTinder')
}

module.exports = connectDb