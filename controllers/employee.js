const EmployeeModel = require('../models/employee');


module.exports.getAllEmployees = async (req, res) => {
    try {
    const employee = EmployeeModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }});
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


module.exports.getSingleEmployee = async (req, res) => {

    const { id } = req.params;
 
    try {
 
        const employee = await EmployeeModel.findOne({ _id: id });
 
        if (employee) {
            res.status(200).json({
                success: true,
                message: "employee fetch successfull",
                data: employee
            })
        } else {
 
            res.status(404).json({
                success: false,
                message: "employee not found ",
            })
 
        }  
    } catch (error) {
 
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
 
 }




module.exports.addEmployee = async (req, res) => {

    const { name , position , DOB , DOJ , role , email , number , gender , address , bank , accno , ifsc } = req.body;
 
    try {
 
        const addData = await EmployeeModel.insertMany({
            name: name,
            position: position,
            dateOfBirth: DOB,
            dateOfJoining: DOJ,
            role: role,
            email: email,
            contactNumber: number,
            gender:gender,
            address : address,
            bank:bank,
            accno:accno,
            ifsc:ifsc
        });
 
        if (addData) {
            res.status(200).json({
                success: true,
                message: "employee details added successfully",
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