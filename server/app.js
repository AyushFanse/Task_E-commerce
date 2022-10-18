const registerRouter = require("./routes/register");
const productRouter = require("./routes/product");
const mongo = require("./middleWare/connection");
const usersRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const createError = require("http-errors");
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//^--------------------------* DB CONNECTIONS *--------------------------^//

mongo.connect();
dotenv.config();

//^--------------------------* VIEW ENGIN *--------------------------^//

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//^--------------------------* SWAGGER SETUP *--------------------------^//
const options = {
    definition:{
        openapi: '3.0.3',
        info:{
            title: 'E-commerce Backend UI',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3001'
            }
        ]
    },
    apis:['./routes/*.js']
}

const SwaggerSpec = swaggerJsDoc(options)

//&--------------------------* ROUTERS *--------------------------&//

app.use("/", indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec))
app.use("/user", usersRouter);
app.use("/product", productRouter);
app.use("/register", registerRouter);

//!------------------* ERRORS HANDLER *------------------!//

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

//*--------------------------* PORT *--------------------------*//

var port = process.env.PORT || "3001";
app.set("port", port);
app.listen(port, () =>
    console.log(`Server is stated on http://localhost:${port}`)
);

module.exports = app;
