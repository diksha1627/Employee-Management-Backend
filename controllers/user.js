const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.getAllUsers = async(req,res) => {

    let users;
    try {
     users = await UserModel.find();
    } catch (error) {

      console.log(error);
    }

    if(!users){
        res.status(404).json({message: "No Users Found"});
    }

    res.status(200).json({users});
}

module.exports.signup = async(req,res)=>{

    const { type , name , email , password } = req.body;

    let existingUser;

    try {
         existingUser = await UserModel.findOne({email});
        
    } catch (error) {
        console.log(err);
    }

    if(existingUser){
     res.status(200).json({ message: "user already exists login instead "});
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new UserModel({
        type : type,
        name : name,
        email : email,
        password : hashedPassword,
    })

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
}


module.exports.login = async(req,res) =>{

    const { email , password } = req.body;

    let existingUser;

    try {
        existingUser = await UserModel.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if(!existingUser){
        res.status(200).json({ message: " Could not find the user by this email "});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
       res.status(404).json({message: "Incorrect Password"});
    }
   res.status(200).json({message: "Login Successfull" , user: existingUser } );
}