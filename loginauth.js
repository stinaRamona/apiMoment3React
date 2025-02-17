const HapiJwt = require("hapi-auth-jwt2"); 
const Admin = require("./models/admin.model"); 

const validate = async (decoded, request, h) => {
    try {
        const admin = Admin.findById(decoded.id); 
        if (!admin) {
            return { isValid: false }
        }

        return { isValid: true }; 

    } catch(error) {
        console.log(error); 

        return { isValid : false } 
    }
}; 

const loginAuthStrategy = async (server) => {
    await server.register(HapiJwt); 

    server.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET_KEY, 
        validate, 
        verifyOptions: { algorithms: ["HS256"] },
    }); 

    server.auth.default("jwt"); 
}; 

module.exports = loginAuthStrategy; 