const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    dateOfBirth: String,
    dateOfJoining: String,
    role:String,
    email:String,
    contactNumber:String,
    gender:String,
    address:String,
    bank:String,
    accno:String,
    ifsc:String
});

module.exports = new mongoose.model('employee', EmployeeSchema);