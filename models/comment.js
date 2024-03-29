const mongoose = require ("mongoose");

const commentSchema =({
    
    text:String,
    author:  { 
       id: {
           type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
          createdAt: {type: Date, default: Date.now},
       
       username: String
    }
    
 })

module.exports = mongoose.model("Comment", commentSchema);