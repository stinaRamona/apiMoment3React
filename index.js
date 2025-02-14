'use strict';

const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose"); 
require("dotenv").config(); 

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost', 
        routes: {
            cors: {
                origin: ['*'], //Cors ok
                credentials: true // cookie ok
            }
        }
    });

    //koppla till databasen 
    Mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Ansluten till MongoDB"); 
    }).catch((error) => {
        console.log("Fel vid anslutning:" + error); 
    });

    //router 
    //kanske behöver kombinera rutterna sen. (behöver göra för auth också)
    const routes = require("./routes/blogpost.route"); 
    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();