const webSocketServer = require('websocket').server;
const http = require('http');
const cryptoCTRL = require('../controllers/crypto-controller')

const webSocketPort = process.env.WEBSOCKET_PORT;

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketPort);

const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    // ! probably shouldn't accept ALL and any connections

    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            const dataFromClient = JSON.parse(message.utf8Data);
            const json = { success: true };

            await cryptoCTRL.getCryptoValueRawData(dataFromClient.currencyA, dataFromClient.currencyB, result => {
                if (result != null) {

                    console.log("Response.data ", result.data);
                    if (result != null && result.data.length > 0) {
                        json.price = result.data[0].price;

                        console.log("Sending json to connection: ", json);
                        connection.sendUTF(JSON.stringify(json));
                    }
                }
            })
        }
    });

    connection.on('close', function(connection) {
        delete clients[userID];
    })
});

console.log("Started websocket");

module.exports = {
    wsServer
}