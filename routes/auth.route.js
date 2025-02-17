const Admin = require("../models/admin.model"); 
const Joi = require("joi"); 
const bcrypt = require("bcrypt"); 
const Jwt = require("jsonwebtoken"); 


const authRouteArr = [
    //För att lägga till användare 
    {
        method: "POST", 
        path: "/adduser", 

    }, 

    //För skyddad rutt
    {
        method: "GET", 
        path: "/protected"
    }, 


] 

module.exports = authRouteArr; 