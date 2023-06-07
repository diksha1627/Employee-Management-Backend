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



const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
