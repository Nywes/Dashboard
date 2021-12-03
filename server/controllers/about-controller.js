
getServerInfo = () =>
{
    var serverInfo = {};

    // * current epoch
    serverInfo.current_time = Date.now();

    // * services [name: serviceName, widgets: [{name: widgetName, description: desc, params: [{name: paramName, type: string}] ] ]
    var services = [];

    var nbaWidgets = [];
    nbaWidgets.push(
        {
            name: "NBA_Teams",
            description: "Search for an NBA team and display its basic information",
            params: [{
                name: "City",
                type: "String"
            }]
        }
    );
    nbaWidgets.push(
        {
            name: "NBA_Players",
            description: "Search for an NBA player and display their basic information",
            params: [{
                name: "Player name",
                type: "String"
            }]
        }
    );
    var NBAService = {name: "NBA", widgets: nbaWidgets};
    services.push(NBAService);

    var hearthstoneWidget = [];
    hearthstoneWidget.push(
        {
            name: "Hearthstone cards",
            description: "Search for a hearthstone card and display its information",
            params: [{
                name: "Card name",
                type: "String"
            }]
        }
    )
    var hearthstoneService = {name: "Hearthstone", widgets: hearthstoneWidget};
    services.push(hearthstoneService);

    var cryptoWidget = [];
    cryptoWidget.push(
        {
            name: "Cryptocurrency converter",
            description: "Search for currencies and convert their values",
            params: [
                {
                    name: "Amount to convert",
                    type: "Integer"
                },
                {
                    name: "Cryptocurrency A",
                    type: "String"
                },
                {
                    name: "Currency B (cryptocurrency or fiat)",
                    type: "String"
                }
            ]
        }
    );
    var cryptoService = {name: "Cryptocurrency", widgets: cryptoWidget};
    services.push(cryptoService);

    var unsplashWidget = [];
    unsplashWidget.push(
        {
            name: "Background changer",
            description: "Search/display a carrousel of images. Click on one to display it in the background",
            params: [
                {
                    name: "Query",
                    type: "String"
                }
            ]
        }
    );
    var unsplashService = {name: "Unsplash", widgets: unsplashWidget};
    services.push(unsplashService);

    var quoteWidget = [];
    quoteWidget.push(
        {
            name: "Quote generator",
            description: "Select a theme and view a random quote",
            params: [
                {
                    name: "Theme",
                    type: "String"
                }
            ]
        }
    );
    var quoteService = {name: "Quotes", widgets: quoteWidget};
    services.push(quoteService);

    serverInfo.services = services;

    return (serverInfo);
}

getDashboardInfo = async (req, res) =>
{
    // * nothing to verify I guess just return the values

    var dashboardInfo = {};

    console.log("Req = ", req);
    console.log("Res = ", res);

    var hostIP = "";
    dashboardInfo.client = {host: hostIP};

    var serverInfo = getServerInfo();
    dashboardInfo.server = serverInfo;

    return (res.status(200).json(dashboardInfo));
}

module.exports = {
    getDashboardInfo,
}