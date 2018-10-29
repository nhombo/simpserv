const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT = 10;
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token:{
        type: String
    }
})

//bcrypt
userSchema.pre('save', function(next){
    var user = this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(SALT, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash){
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

/*pour login avec costum methode*/
userSchema.methods.compareLePassword = function (lePassworFournitEnCandidature, callback){
bcrypt.compare(lePassworFournitEnCandidature,this.password,function(err,isMatth){
    if(err) return callback(err)
    callback(null,isMatth)
})
}

/*********Test token avec model */
userSchema.methods.genereToken = function(callback){
    var user = this;
    // userId = user._id;
    // secret = config.SECRET;
    var token = jwt.sign(user._id.toHexString(),'unsecret37');
    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null,user);
    })
}

userSchema.statics.findByToken = function(token,callback){
    var user = this;
    jwt.verify(token, 'unsecret37', function(err, decode){
        user.findById({_id:decode, token:token}, function(err, user){
            if(err) return callback(err);
            callback(null,user);
        } )
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User };

