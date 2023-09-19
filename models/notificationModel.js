import mongoose from "mongoose";
import Url from "mongoose-type-url";

const notificationSchema = new mongoose.Schema({
    message: String
});

const notificationSchema2 = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    link: {
        type: Url,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    // elgibility:
    // lastDateToApply:
    // Role/Title:
});

notificationSchema2.pre(/^find/, function(next) {
    this.sort('-createdAt');
    next();
})

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;