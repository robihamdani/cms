const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'category' })

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;