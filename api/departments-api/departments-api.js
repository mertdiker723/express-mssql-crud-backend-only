const router = require("express").Router();
const deparmentConnect = require('../../db/departments-db/departments-db');


router.route("/")
    .get((req, res) => {
        deparmentConnect.getDepartments()
            .then(result => {
                res.json(result[0]);
            })
    })
router.route("/:id")
    .get((req, res) => {
        deparmentConnect.getDepartment(req.params.id)
            .then(result => {
                res.json(result[0]);
            })
    })
router.route("/")
    .post((req, res) => {
        let department = { ...req.body };
        deparmentConnect.insertDepartment(department)
            .then(result => {
                res.status(201).json(result);
            })
    })

router.route("/")
    .put((req, res) => {
        let department = { ...req.body };
        deparmentConnect.updateDepartment(department)
            .then(result => {
                res.status(201).json(result);
            })
    })
router.route("/:id")
    .delete((req, res) => {
        deparmentConnect.deleteDepartment(req.params.id)
            .then(result => {
                res.status(201).json(result);
            })
    })

module.exports = router;