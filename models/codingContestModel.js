import mongoose from 'mongoose';
import Url from "mongoose-type-url";

const codingContestSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: Url,
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
        type: String
    }
});

const CodingContest = mongoose.model('CodingContest', codingContestSchema);

export default CodingContest;