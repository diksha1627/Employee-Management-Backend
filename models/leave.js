const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema ({
    applicantID: {type: mongoose.Schema.Types.ObjectId, ref: 'hrm-user', required: true},
    title : String,
    type : String,
    period : String,
    startDate : String,
    endDate : String,
    reason : String, 
})

module.exports = new mongoose.model('leave', LeaveSchema);