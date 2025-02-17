const adminRoute = require("./auth.route"); 
const blogRoute = require("./blogpost.route"); 

const combinedRoutes = [
    ... adminRoute, 
    ... blogRoute
]; 

module.exports = combinedRoutes; 