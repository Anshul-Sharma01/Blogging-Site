import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    Username : {
        type : String,
        required : [true, 'Username is required'],
        unique:[true,'Username already exists'],
        trim : true,
        lowercase : true,
        minLength:[6,'Username should be atleast 5 characters'],
        maxLength : [18,'Username should be less than 18 characters']
    },
    name: {
        type:String,
        trim : true,
        minLength:[3,'Name must be alteast 5 characters'],
        maxLength :[10, 'Name must be less than 10 characters']
    },
    email : {
        type:String,
        required : [true,'Email is required'],
        unique : [true, 'Email already exists'],
        lowercase : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill in a valid email address'
        ],
    },
    password : {
        type : String,
        required : [true,'Password is required'],
        minLength : [8, 'Password must be of atleast 8 characters'],
        select : false
    },
    role : {
        type:String,
        enum : ['USER','ADMIN'],
        default:'USER'
    },
    avatar : {
        public_id : {
            type : String,
        },
        secure_url : {
            type:String,
        }
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
},{
    timestamps:true
})

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods = {
    generateJwtToken : async function(){
        return await jwt.sign(
            {
                id : this._id,
                role : this.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword : async function(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    }
}



const User = model('User', userSchema);


export default User;