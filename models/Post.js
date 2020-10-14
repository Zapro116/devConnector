const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    },
    text:{
      type: String,
      required:true
    },
    name: String,
    avatar: String,
    likes:[
      {
        user:{
          type: Schema.Types.ObjectId,
          ref:'users'
        }
      }
    ],
    comments:[
      {
        user:{
          type: Schema.Types.ObjectId,
          ref:'users'
        },
        name:String,
        avatar:String,
        text:{
          type: String,
          required:true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Post = mongoose.model('posts',PostSchema);