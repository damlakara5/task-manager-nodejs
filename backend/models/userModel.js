const mongoose = require( "mongoose");
const bcrypt = require("bcryptjs")

userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : [true, "User should have an user name!"],
        unique: true
    },
    password: {
        type: String,
        required : [true, "Please provide a password"],
        minLength: 8,
        select: false
    } ,
    passwordConfirm : {
        type: String,
        required : [true, "Please provide a password"],
        minLength: 8,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    },
})


userSchema.pre("save", async function(next) {

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined

    next()
})

userSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}



const User = mongoose.model("User", userSchema)


module.exports = User