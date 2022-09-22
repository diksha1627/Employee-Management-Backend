var PayslipModel = require('../models/payslip');
const fs = require('fs');
var csv = require('csvtojson');


module.exports.getAllPayslips = (req, res)=>{
    PayslipModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
}



module.exports.uploadPayslip= async (req, res, next) => {
    try {
        const arrayToAdd = [];
        console.log(req.file.path);
        await PayslipModel.remove({});
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
                        email: jsonObj[i]['Email Id'],
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
                    fs.unlinkSync(req.file.path);
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

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        })
    }

}




module.exports.getSinglePayslip = async (req, res) => {
    const { id } = req.params;
    try {

        const getSinglePayslip = await PayslipModel.findOne({ _id: id });

        if (getSinglePayslip) {
            res.status(200).json({
                success: true,
                message: "payslip fetch successfull",
                data: getSinglePayslip
            }) 
        } else {

            res.status(404).json({
                success: false,
                message: "payslip not found ",
            })

        }

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


module.exports.updateSinglePayslip = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;


    try {

        const updateSinglePayslip = await PayslipModel.findByIdAndUpdate({ _id: id }, {
            name: name,
        },
            {
                new: true
            }
        );

        if (updateSinglePayslip) {
            res.status(200).json({
                success: true,
                message: "payslip Updated successfull",
                data: updateSinglePayslip
            })
        } else {

            res.status(404).json({
                success: false,
                message: "payslip not found ",
            })

        }

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}