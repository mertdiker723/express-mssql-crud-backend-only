const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();
const departmentApi = require('./api/departments-api/departments-api');
const employeeApi = require("./api/employees-api/employees-api");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routers
app.use("/department", departmentApi);
app.use("/employee", employeeApi);

router.use((req, res, next) => {
    console.log("mw");
    next();
});


var port = process.env.port || 8090;
app.listen(port, () => {
    console.log(`Employee API is running at ${port}`);
});