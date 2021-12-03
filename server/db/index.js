const mongoose = require('mongoose');

console.log("Connecting to mongodb...");
// ! UTILISER DES SECRETS pour tout /!\
// ? comment recup les var d'env dans le conteneur
// ! authsource is important here

// ! create if collection does not exist
// ! just connect for now, specify database later

var mongoHost = process.env.DASHBOARD_MONGO_HOST;
var mongoRootUser = process.env.MONGO_ROOT_USERNAME;
var mongoRootPass = process.env.MONGO_ROOT_PASSWORD;


if (mongoHost == undefined || mongoHost == "") {
    mongoHost = "localhost";
}

// ! mongohost is the name of the service in docker-compose
mongoose
    .connect(`mongodb://${mongoRootUser}:${mongoRootPass}@${/*127.0.0.1*/mongoHost}:27017/dashboard`, { useNewUrlParser: true, authSource: "admin"})
    .catch(e => {
        console.error('Connection error', e.message)
    })
    .then(() => {
        console.log("Connected to mongo db");

        // ! this is how you switch you database and check the current one
        // mongoose.connection =  mongoose.connection.useDb("users");
        // console.log("Current db: " + mongoose.connection.name);
    });

const db = mongoose.connection

module.exports = db