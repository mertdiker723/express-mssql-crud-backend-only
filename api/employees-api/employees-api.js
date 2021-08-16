const router = require("express").Router();
const employeeConnect = require("../../db/employees-db/employees-db");

router.route("/")
    .get((req, res) => {
        employeeConnect.getEmployees()
            .then(result => {
                res.json(result[0]);
            })
    })

router.route("/:id")
    .get((req, res) => {
        employeeConnect.getEmployee(req.params.id)
            .then(result => {
                res.json(result[0]);
            })
    })

router.route("/")
    .post((req, res) => {
        const employee = { ...req.body };
        employeeConnect.insertEmployee(employee)
            .then(result => {
                res.status(201).json(result[0]);
            })
    })

router.route("/")
    .put((req, res) => {
        const employee = { ...req.body };
        employeeConnect.updateEmployee(employee)
            .then(result => {
                res.status(201).json(result[0]);
            })
    })

router.route("/:id")
    .delete((req, res) => {
        employeeConnect.deleteEmployee(req.params.id)
            .then(result => {
                res.status(200).json(result[0])
            })
    })

module.exports = router;
