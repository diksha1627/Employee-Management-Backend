const LeaveModel = require("../models/leave");


module.exports.getApplications = async(req,res)=>{
    let applications;
    try {
        applications = await LeaveModel.find();
    } catch (error) {
        console.log(error);
    }

    if(!applications){
        res.status(400).json({
            success:false,
            message:"no leave applications"
        });
    }

    res.status(200).json({applications});
}


module.exports.addApplication = async(req,res)=>{

    const { title , type , period , startDate , endDate , reason, id } = req.body;

    try {
 
        const addData = await LeaveModel.insertMany({
            applicantID :id,
            title: title,
            type:type,
            period:period,
            startDate: startDate,
            endDate: endDate,
            reason: reason,
        });
 
        if (addData) {
            res.status(200).json({
                success: true,
                message: "leave application details added successfully",
                data: addData
            })
        } else {
 
            res.status(404).json({
                success: false,
                message: "details not found ",
            })
        }
 
    } catch (error) {
 
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}