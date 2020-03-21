const https = require("https");


function server(app)
{
    console.log("Developement Environment...");

    let port = 8080;
    let timeout = 500;
    let maxConnections = 10000;

    let httpsServer = https.createServer(app).listen(port, () =>{
        console.log("Running on port " + port + "....");
    });

    httpsServer.setTimeout = timeout;
    httpsServer.maxConnections = maxConnections;
}

module.exports.server = server;