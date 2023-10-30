require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const constant = require("./src/utilities/constant");
const db = require("./src/config/dbConnection");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const association = require("./src/models/associations");
const cors = require("cors");
const app = express();
const logger = require("./src/utilities/logger");


//SYNC DATABASE
try {
  db.sync({ force: false })
    .then(() => {
      association();
      logger.info("Connected to database successfully!!");
      app.listen(constant.PORT, () => {
        logger.info(`${constant.LISTENING_TO_PORT} ${constant.PORT}`);
      });
    })
    .catch((err) => {
      logger.error("Error: ", err);
    });
} catch (err) {
  console.log("err :: ", err);
}
app.use(bodyparser.json());
app.use(cors());
//SWAGGER ROUTE
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(`/${constant.BASE_URI}`, (req, res) => {
  res.end("Hello World!");
});

app.use(`/${constant.BASE_URI}`, require("./src/routes/userRoutes"));
app.use(`/${constant.BASE_URI}`, require("./src/routes/userRoleRoutes"));
app.use(`/${constant.BASE_URI}`, require("./src/routes/multipleDataRoutes"));
app.use(`/${constant.BASE_URI}`, require("./src/routes/spDataRoutes"));



// index file me protected rout dal na he.