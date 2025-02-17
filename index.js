'use strict';

const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose"); 
const loginAuthStrategy = require('./loginauth');
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

    //går genom validering från loginauth.js
    await loginAuthStrategy(server); 

    //koppla till databasen 
    Mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Ansluten till MongoDB"); 
    }).catch((error) => {
        console.log("Fel vid anslutning:" + error); 
    });

    //router 
    //rutter kombinderade i combined.route.js
    const routes = require("./routes/combined.route"); 
    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();