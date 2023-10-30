const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")

exports.login = async(req,res,next) => {
    try{
        const { userName, password } = req.body;

        if(!req.body.userName && !req.body.password){
            return next(new Error("Please provide email and password"))
        }
        const user = await User.findOne({userName , password}).select('+password')
        if(!user || !(await user.correctPassword(password, user.password))) {
            return next(new Error("Invalid username or password"))
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.status(200).json({
            message: "success",
            token,
            user
        })
    }catch(e) {
        res.status(400).json({
            message: "fail",
            error: e
        })
    }
}


exports.register = async( req,res,next) => {
    try{

        const user = await User.create({
            userName : req.body.userName,
            password : req.body.password,
            passwordConfirm : req.body.passwordConfirm,
        })

        if(!user) {
            return next(new Error("Couldn't find any user with that user name"))
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.status(200).json({
            message: "success",
            token,
            user
        })
    }catch(e) {
        console.log(e)
        res.status(400).json({
            message: "fail",
            error: e
        })
    }
}


exports.protect = async(req,res,next) => {
    //get the token from the request header
    let token;
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];

        if (token === "null") {
            token = null;
        }
    }

    if(!token){
       return next(new Error('You are not logged in! Please log in to get access.'))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);


    req.user = currentUser;
    next()
}