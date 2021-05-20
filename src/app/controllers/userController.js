// promisify help to convert callback base to promise base 
// with that u can use await 
const { promisify } = require('util');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../models/userModel');
const base = require('./baseController');

const createToken = user => {
    return jwt.sign(
        { user }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED_TIME }
    );
};

exports.signup = async (req, res, next) => {
    console.log("Signup request data: ", req.body);
    const doc = await User.findOne({ email : req.body.email });
    if(doc){
        res.status(400).json({
            status: 'fail',
            message: 'This email is already taken!'
        });
    }else{
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: (req.body.googleID) ? "" : req.body.password,
                googleID: req.body.googleID,
                role: req.body.role,
            });
            const token = createToken(user._id);
    
            //remove password before send response to client
            user.password = undefined;
    
            res.status(201).json({
                status: 'success',
                token,
                user,
            });
        }
        catch (err) {
            res.status(400).send("Error");
            console.log('userController line 43 fail to create new user');
            console.log(err.keyValue);
            next(err);
        }
    }
}

exports.login = async (req, res, next) => {
    if(req.body.googleID){
        const user = await User.findOne({ googleID : req.body.googleID});
        if(!user)
            this.signup(req, res, next);
        else{
            user.password = undefined;
    
            const token = createToken(_.pick(user, ['_id', 'role']));
    
            res.status(200).json({
                status: 'success',
                token,
                data: user,
            })
        }
    }else{
        try {
            console.log(req.body);
            
            const { email, password } = req.body;
    
            //1 check if email and password exits
            if (!email || !password) {
                res.status(404).json({
                    message : "Email and password are required!",
                })
                return;
            }
    
            //2 check if user exist and password is correct
            const user = await User.findOne({
                email,
            }).select("+password");
    
            if (!user || !(await user.comparePassword(
                password, user.password))) {
                res.status(401).json({
                    message: 'email or password is incorrect!'
                });
                return;
            }
    
            //remove password before sending it to client
            user.password = undefined;
            user.googleID = undefined;
    
            //3 all correct send jwt to the client 
            const token = createToken(_.pick(user, ['_id', 'role']));
            user.role = undefined;

            res.status(200).json({
                status: 'success',
                token,
                user,
            })
        }
        catch (err) {
            console.log('error when login');
            next(err);
        }
    }
}

exports.getOne = base.getOne(User);

exports.getAll = base.getAll(User);

exports.update = base.updateOne(User);

exports.delete = base.deleteOne(User);