const Mongoose = require("mongoose");  

const AdminSchema = new Mongoose.Schema({
    user_name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
    },
    password: {
        type: String, 
        required: true
    }, 
    created: {
        type: Date, 
        default: Date.now, 
    }
}); 

const Admin = Mongoose.model("Admin", AdminSchema); 

module.exports = Admin; 