const http = require("https");


function server(app)
{
    console.log("Developement Environment...");

    let port = process.env.PORT || 8080;
    let timeout = 500;
    let maxConnections = 10000;

    let httpServer = http.createServer(app).listen(port, () =>{
        console.log("Running on port " + port + "....");
    });

    httpServer.setTimeout = timeout;
    httpServer.maxConnections = maxConnections;
}

module.exports.server = server;