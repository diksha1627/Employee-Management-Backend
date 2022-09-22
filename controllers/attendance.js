const AttendanceModel = require('../models/attendance');


module.exports.getAttendance = async(req,res) =>{

    let user;

    try {
        user = await AttendanceModel.find();
    } catch (error) {
        console.log(error);
    }

    if(!user){
        res.status(404).json({
            message:"no attendance found"
        });
    }

    res.status(200).json({user});
}


module.exports.addAttendance = async(req,res)=>{
     
    const { id , year , month , date , present } = req.body;
     

    try {
        const addData = await AttendanceModel.insertMany({
            applicantID : id,
            year : year ,
            month : month ,
            date : date ,
            present : present
        });

        
        if (addData) {
            res.status(200).json({
                success: true,
                message: "attendance details added successfully",
                data: addData
            })
        } else {
 
            res.status(404).json({
                success: false,
                message: "details not found ",
            });
        }
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
        
    }
}