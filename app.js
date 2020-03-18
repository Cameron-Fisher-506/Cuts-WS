const express = require("express");
const app = express();
const server = require("./startup/server").server;
const connectionToMongoDB = require("./startup/db").connectionToMongoDB;
const routes = require("./startup/routes").routes;

//connect to mongoDB
connectionToMongoDB();

//add routes
routes(app);

//start server
server(app);