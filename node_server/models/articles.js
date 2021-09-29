const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],  
    date: { type: Date, default: Date.now },
});

postSchema.path('_id');
module.exports = mongoose.model('Post',postSchema);
