const serverPort = process.env.DASHBOARD_SERVER_PORT;

const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Dashboard API',
        termsOfService: '',
    },
    servers: [
        {
            url: `http://localhost:${serverPort}/`,
            description: 'Local server'
        }
    ],
    paths: {
        "/about.json": {
            "get": {
                description: "Returns information about the dashboard's services and widgets",
                operationId: "about",
                responses: {
                    "200": {
                        description: "A list of services and widgets, timestamp, and client ip",
                    }
                }
            }
        },
        "/crypto_api/currencies/{cryptoID}&{targetCurrencyID}": {
            "get": {
                description: "Returns the price of cryptocurrencyA, in currency B",
                operationId: "Convert crypto",
                parameters: [
                    {
                        name: "cryptoID",
                        in: "path",
                        description: "Name of cryptocurrencyA"
                    },
                    {
                        name: "targetCurrencyID",
                        in: "path",
                        description: "Name of currency B"
                    }
                ],
                responses: {
                    "200": {
                        description: "Information about the chosen cryptocurrency (including price)",
                    },
                    "400": {
                        description: "Error"
                    }
                }
            }
        },
        "/crypto_api/currencyOptions/": {
            "get": {
                description: "Returns available currency choices",
                operationId: "Currency Options",
                responses: {
                    "200": {
                        description: "A list of available currency choices",
                    },
                    "400": {
                        description: "Error"
                    }
                }
            }
        }

    }
}

module.exports = swaggerDocument