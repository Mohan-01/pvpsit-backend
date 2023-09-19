import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User must have a username'],
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'user'],
        required: true,
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must contain atleast 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        validate: [validator.isEmail, 'Please enter a valid email']
    }
});

userSchema.pre('save', function () {
    this.passwordConfirm = undefined;
})

const User = mongoose.model('User', userSchema);

export default User;