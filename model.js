var mongoose = require('mongoose'); 
  
var PayslipSchema = new mongoose.Schema({  
    name: String,
    employeeCode: String,
    designation: String,
    dateOfJoining:Date,
    paymentMonth:String,
    issuerName:String,
    accountNumber:String,
    modeTransaction:String,
    paymentStatus:String,
    email:String,
    department:String,
    currentDate:Date,
    amount:Number,
}); 
  
module.exports = new mongoose.model('Payslip2', PayslipSchema);