import mongoose from 'mongoose';
import Url from "mongoose-type-url";

const internshipSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    about: String,
    eligibility: {
        type: String,
        default: 'All are eligible'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastDateToApply: Date,
    coverImg: {
        type: String,
    }
});

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;