const express = require('express');
const router = express.Router();
const { getApplications , addApplication } = require('../controllers/leave');


router.get("/get-leave-applications",getApplications);
router.post("/add-application",addApplication);

module.exports = router;
