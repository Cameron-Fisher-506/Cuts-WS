const bodyparser = require("body-parser");
const stylistRoutes = require("../routes/stylistRoutes");

function routes(app)
{
    app.use(bodyparser.json({limit:"100mb"}));
    app.use("/rest/stylist", stylistRoutes);
}

module.exports.routes = routes;