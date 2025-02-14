const Mongoose = require("mongoose"); 

const blogpostSchema = new Mongoose.Schema(
    {
        title: {
            type: String, 
            required: true, 

        }, 
        author: {
            type: String, 
            required: true,
        },
        postText: {
            type: String, 
            required: true,
        }, 
        created: {
            type: Date, 
            default: Date.now,
        }
    }); 

const BlogPost = Mongoose.model("BlogPost", blogpostSchema); 

module.exports = BlogPost;