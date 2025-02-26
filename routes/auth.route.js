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
            auth: false,
            validate: {
                payload: Joi.object({
                    user_name: Joi.string().min(3).required(), 
                    email: Joi.string().email().required(), 
                    password: Joi.string().min(5).required()
                })
            }
        },
        handler: async (request, h) => {
            const { user_name, email, password} = request.payload; 

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new Admin({
                user_name, 
                email, 
                password: hashedPassword
            });

            return await user.save();
        } 
    }, 

    //För att logga in 
    {
        method: "POST", 
        path: "/login/auth", 
        options: {
            auth: false, 
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(), 
                    password: Joi.string().required()
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

                //token skapas
                const token = Jwt.sign(
                    {id: admin._id, email: admin.email}, 
                    process.env.JWT_SECRET_KEY, 
                    {expiresIn: "8h"}
                )

                return h.response({ token, user: admin }).code(200); 

            } catch(error) {
                console.log(error);  
                return h.response("Något gick fel på serversidan").code(500);
            }
        }
    },

    //För skyddad rutt
    {
        method: "GET", 
        path: "/protected",
        options: {
            auth: "jwt"
        }, 
        handler: async (request, h) => {
            return { message: "Hurra! Du har tillgång till den skyddade rutten!" }
        }
    }, 

] 

module.exports = authRouteArr; 