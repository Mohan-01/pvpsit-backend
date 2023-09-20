import util from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const isAuthorized = async (req, res, next) => {
    if(!req.user) {
        res.status(403).json({
            status: 'forbidden',
            message: 'Please login to add an user'
        });
        return ;
    }
    if(req.user.role !== 'admin' && req.user.role !== 'staff') {
        res.status(403).json({
            status: 'forbidden',
            message: 'You are not allowed to perform this action. Kindly contact the administrator'
        })
        return ;
    }
    next();
}

const isLoggedIn = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.jwt) return res.status(403).json({status:'error', message: 'You are not logged in'});
        const decoded = await util.promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) return res.status(403).json({status:'error'});
        res.locals.user = currentUser;
        res.status(200).json({
            status: 'success',
            data: currentUser
        });
    } catch (err) {
        res.status(403).json({status:'error'});
        return ;
    }
};

const protect = async (req, res, next) => {
    let token;
    // console.log(req);
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
    }
    console.log({token});
    if (!token) {
        res.status(403).json({
            status: 'forbidden',   
            message: 'You are not logged in. Please log in to get access.'
        })
        return ;
    }
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: 'forbidden',
            message: 'User is no longer avaiable. Please sign up again!'
        })
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
}

const signToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
        console.log('production');
        cookieOptions.sameSite='None';
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions);
    console.log('cookie set ->' + token);
    // Remove the passwords from the output
    user.password = undefined;
    // console.log({res});
    res.status(statusCode).json({
      status: 'success',
      token,
      data: user,
      role: user.role
    });
  };

const signup = async (req, res) => {
    console.log(req.body);
    const user = await User.create(req.body);
    createSendToken(user, 201, res);
}

const login = async (req, res) => {
    const {userName, password} = req.body;
    // console.log({userName, password});
    console.log('login')
    const user = await User.findOne({userName}).select('+password');
    if(!user) {
        res.status(404).json({
            status: 'error',
            message: 'Username not found. Kindly contact the administrator',
        })
        return ;
    }
    if(user.password !== password) {
        res.status(401).json({
            status: 'unauthorized',
            message: 'Password incorrect.',
        })
        return ;
    }
    // console.log('login successful');
    createSendToken(user, 200, res);
}

const logout = (req, res) => {
    res.cookie('jwt', 'logged out', {
        expires: new Date(1),
        httpOnly: true,
        sameSite:'None',
        sameSite:'None',
        secure:rue
    });
    res.clearCookie('jwt');
    res.status(200).json({status: 'success'});
}

const updatePassword = async (req, res) => {
    if(!req.user) {
        res.status(403).json({
            status: 'forbidden',
            message: 'Please login to update your password'
        })
    }
    
    if(req.body.password !== req.body.confirmPassword) {
        res.status(403).json({
            status: 'forbidden',
            message: 'Please confirm your password correctly'
        });
    }

    req.user.password = req.body.password;
    req.user.save();
}

const deleteUser = async (req, res) => {
    const userName = req.body.userName;
    const id = (await User.findOne({userName}))._id;
    await User.findByIdAndDelete(id);
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const userController = {
    isAuthorized, login, signup, updatePassword, protect, deleteUser, isLoggedIn, logout
}

export default userController;