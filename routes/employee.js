const express = require('express');
const router = express.Router();
const { getAllEmployees , getSingleEmployee , addEmployee} = require('../controllers/employee');


router.get("/get-employee-details",getAllEmployees);

router.get("/get-single-employee/:id", getSingleEmployee);

router.post("/employee-add", addEmployee);


module.exports = router;