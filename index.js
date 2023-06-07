var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
const morgan = require('morgan');
const payslipRouter =require('./routes/payslip');
const employeeRouter = require('./routes/employee');
const userRouter = require('./routes/user');
const leaveRouter = require('./routes/leave');
const attendanceRouter = require('./routes/attendance');


require('dotenv/config');

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",payslipRouter);
app.use("/",employeeRouter);
app.use("/",userRouter); 
app.use("/",leaveRouter);
app.use("/",attendanceRouter);


//mongodb+srv://quordnet:quordnet-1234@cluster0.mhmaf.mongodb.net/HRMTool?retryWrites=true&w=majority
//
const CONNECTION_URL = 'mongodb://diksha:Alpha113.@ac-gzpeqd8-shard-00-00.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-01.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-02.zpie1go.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkgko1-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
