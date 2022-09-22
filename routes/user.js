const express = require('express');
const router = express.Router();
const { getAllUsers , signup , login} = require('../controllers/user');


router.get('/',getAllUsers);
router.post('/signup',signup);
router.post('/login',login);



module.exports = router;