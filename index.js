var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');
var csv = require('csvtojson');
const morgan = require('morgan');
require('dotenv/config');

 const fileStorageEngine = multer.diskStorage({
     destination : (req, file ,cb)=>{
         cb(null,"./uploads");
     },
     filename :(req,file,cb)=>{
         cb(null, Date.now() + "--" + file.originalname);
     },
 });

var upload = multer({ storage: fileStorageEngine  });
var PayslipModel = require('./model');
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    PayslipModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
});
app.post('/',upload.single('file'), async (req, res, next) => {
    console.log(req.file);
    try {
        const arrayToAdd = [];
        console.log(req.file.path);
        csv()
            .fromFile(req.file.path)
            .then(async (jsonObj) => {
                for (var i = 0; i < jsonObj.length; i++) {
                    const oneRow = {
                        employeeCode: jsonObj[i]['Employee Code'],
                        dateOfJoining: jsonObj[i]['Date of joining'],
                        paymentMonth: jsonObj[i]['Payment for the month of'],
                        accountNumber: jsonObj[i]['Account Number'],
                        name: jsonObj[i]['Name'],
                        email:jsonObj[i]['Email Id'],
                        designation: jsonObj[i]['Designation'],
                        department: jsonObj[i]['Department'],
                        amount: jsonObj[i]['Amount (₹)'],
                        modeTransaction: jsonObj[i]['Mode of Transaction'],
                        currentDate: jsonObj[i]['Date'],
                        paymentStatus: jsonObj[i]['Payment Status'],
                        issuerName: jsonObj[i]['Issuer Name'],
                    }
                    arrayToAdd.push(oneRow);
                }
                console.log('====================================');
                console.log(arrayToAdd);
                console.log('====================================');

                const addData = await PayslipModel.insertMany(arrayToAdd);
                if (addData) {
                    res.status(200).json({
                        data: addData
                    })
                }
                else {

                    res.status(400).json({
                        data: addData
                    })
                }
            })

    } catch (error) {

        res.status(400).json({
            message: error.message
        })

    }

});

app.get("/get-single-payslip/:id",async(req,res)=>{
      const {id} = req.params;
    try {
        
        const getSinglePayslip = await PayslipModel.findOne({_id:id});

        if(getSinglePayslip){
            res.status(200).json({
                success:true,
                message: "payslip fetch successfull",
                data:getSinglePayslip
            })
        } else {

            res.status(404).json({
                success:false,
                message: "payslip not found ",
            })

        }
        
    } catch (error) {

        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
})



const CONNECTION_URL = 'mongodb+srv://quordnet:quordnet-1234@cluster0.mhmaf.mongodb.net/HRMTool?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
