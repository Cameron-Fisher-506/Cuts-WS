const bodyparser = require("body-parser");
const stylistRoutes = require("../routes/stylistRoutes");
const companyRoutes = require("../routes/companyRoutes");
const clientRoutes = require("../routes/clientRoutes");

function routes(app)
{
    app.use(bodyparser.json({limit:"100mb"}));
    app.use("/rest/stylist", stylistRoutes);
    app.use("/rest/company", companyRoutes);
    app.use("/rest/client", clientRoutes);
}

module.exports.routes = routes;