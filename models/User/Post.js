// const mongoose = require('mongoose');
// const Schema = mongoose.Schema

// const PostSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         default: 'public'
//     },
//     category: {
//         type: Schema.Types.ObjectId,
//         ref: 'category'
//     },
//     file: {
//         type: String
//     },
//     allowComments: {
//         type: Boolean,
//         default: true
//     },
//     body: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     comments: [{
//         type: Schema.Types.ObjectId,
//         ref: 'comments'
//     }]
// })

// const Post = mongoose.model('post', PostSchema)
// module.exports = Post;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "public"
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category"
    },
    file: {
      type: String
    },
    allowComments: {
      type: Boolean,
      default: true
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }]
  },
  { usePushEach: true }
);

module.exports = mongoose.model("posts", PostSchema);
