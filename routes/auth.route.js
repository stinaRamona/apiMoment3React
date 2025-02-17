const Admin = require("../models/admin.model"); 
const Joi = require("joi"); 
const bcrypt = require("bcrypt"); 
const Jwt = require("jsonwebtoken"); 


const authRouteArr = [
    //För att lägga till användare 
    {
        method: "POST", 
        path: "/adduser",
        options: {
            validate: {
                payload: Joi.object({
                    user_name: Joi.string.min(3).required(), 
                    email: Joi.string.email().required(), 
                    password: Joi.string().min(5).required()
                })
            }
        },
        handler: async (request, h) => {
            const user = new Admin(request.payload);
            return await user.save();
        } 
    }, 

    //För att logga in 
    {
        method: "POST", 
        path: "login/auth", 
        options: {
            auth: false, 
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(), 
                    password: Joi.string.required()
                })
            }
        }, 
        handler: async (request, h) => {
            const {email, password} = request.payload; 

            try {
                const admin = await Admin.findOne({ email }); 

                if(!admin) {
                    return h.response({ error: "Fel epost eller lösenord "}).code(401);
                }

                const isValidPassword = await bcrypt.compare(password, admin.password); 

                if(!isValidPassword) {
                    return h.response({ error: "Fel epost eller lösenord "}).code(401); 
                }

            } catch(error) {
                console.log(error);  

                throw new Error; 
            }
        }
    },

    //För skyddad rutt
    {
        method: "GET", 
        path: "/protected",
    }, 


] 

module.exports = authRouteArr; 