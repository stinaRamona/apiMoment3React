const BlogPost = require("../models/blogpost.model"); 
const Joi = require("joi"); 

const blogpostRouteArr = [
    //Hämta hela listan med bloginlägg
    {
        method: "GET", 
        path: "/posts",
        options : {
            auth: false
        },
        handler: async (request, h) => {
            return await BlogPost.find(); 
        }
        
    },

    //Hämta ett specifikt blogginlägg
    {
        method: "GET",
        path: "/post/{id}",
        options: {
            auth: false
        }, 
        handler: async (request, h) => {
            try {
                const post = await BlogPost.findById(request.params.id); 
                return post || h.response("Inlägget hittades inte").code(404)
            } catch(err) {
                return h.response(err).code(500)
            } 
        } 
    }, 

    //Lägg till ett blogginlägg
    {
        method: "POST",
        path: "/post", 
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).required(), 
                    author: Joi.string().min(3).required(), 
                    postText: Joi.string().min(3).required()
                })
            }
        },
        handler: async (request, h) => {
            const post = new BlogPost(request.payload);
            return await post.save();
        }
    }, 

    //Uppdatera ett blogginlägg
    {
        method: "PUT",
        path: "/post/{id}", 
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).required(), 
                    author: Joi.string().min(3).required(),
                    postText: Joi.string().min(3).required()
                })
            }
        },
        handler: async (request, h) => {
            try {
                return await BlogPost.findByIdAndUpdate(
                    request.params.id,
                    request.payload,
                    { new: true }
                );

            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
    
    //Ta bort ett blogginlägg 
    {
        method: "DELETE",
        path: "/post/{id}", 
        options: {
            auth: false,
        },
        handler: async (request, h) => {
            try {
                return await BlogPost.findByIdAndDelete(request.params.id);
            } catch(err) {
                return h.response(err).code(500); 
            } 
        }
    }
]

module.exports = blogpostRouteArr; 

