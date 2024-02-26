const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:'basic'
    },
    followers:{
        type:Number,
        default:0
    },
    followings:{
        type:Array,
        default:null
    }

},{versionKey:false});

UserSchema.pre('save',function(next){
    const user=this;
    bcrypt.hash(user.password,5,(error,hash)=>{
        user.password=hash;
        next();
    });
});

const User=mongoose.model('User',UserSchema);

module.exports=User;