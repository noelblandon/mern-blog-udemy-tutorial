const mongoose = require('mongoose');

const commentsModel = new mongoose.Schema({
    body: String, 
    date: Date   
});

commentsModel.path('_id');
module.exports = mongoose.model('Comment',commentsModel);