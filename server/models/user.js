const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userToken = 'userToken';

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    token: { type: String }
},
{
    collection: 'user',
    versionKey : false
});

userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), userToken);

    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, userToken, function(err, decoded) {
        user.findOne({ "_id": decoded, "token": token } , function(err, user){
            if (err) cb(err);
            cb(null, user);
        });
    });
};

module.exports = mongoose.model('User', userSchema);
