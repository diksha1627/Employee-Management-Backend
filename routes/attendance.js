const express = require('express');
const router = express.Router();
const { getAttendance , addAttendance } = require('../controllers/attendance')

router.get("/get-attendance",getAttendance);
router.post("/add-attendance",addAttendance);


module.exports = router;