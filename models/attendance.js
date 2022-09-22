const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    applicantID: {type: mongoose.Schema.Types.ObjectId, ref: 'hrm-user', required: true},
    year: {type: String, required: true},
    month: {type: String, required: true},
    date: {type: String, required: true},
    present: {type: String, required: true},

});

module.exports = new mongoose.model('attendance',AttendanceSchema);
