const express = require('express');
const router = express.Router();
const fs = require('fs');
var multer = require('multer');
const { getAllPayslips, uploadPayslip, getSinglePayslip, updateSinglePayslip } = require('../controllers/payslip')


const dir = './uploads';
if (fs.existsSync(dir)) {


    var fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname);
        },
    });

} else if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
var fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});




var upload = multer({ storage: fileStorageEngine });

router.get('/get-all-payslips', getAllPayslips);

router.post('/upload-payslip', upload.single('file'), uploadPayslip);

router.get("/get-single-payslip/:id", getSinglePayslip);

router.put("/update-single-payslip/:id", updateSinglePayslip);

module.exports = router;
