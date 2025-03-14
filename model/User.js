const mongoose = require("mongoose");
//Creating schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    }
}, 
{timestamps: true})

//creating model using the above schema
const User = mongoose.model("User", userSchema);


module.exports = User;