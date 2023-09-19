import Notification from "../models/notificationModel.js";

// CRUD

const createNotify = async (req, res) => {
    const notification = await Notification.create(req.body);
    res.status(201).json({
        status: 'success',
        data: notification
    })
}

const getNotify = async (req, res) => {
    res.cookie('my', 'new-cookie');
    const notifications = await Notification.find();
    res.status(200).json({
        status: 'success',
        size: notifications.length,
        data: notifications
    })
}

const updateNotify = async (req, res) => {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
        status: 'success',
        data: notification
    })
}

const deleteNotify = async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const deleteAll = async (req, res) => {
    await Notification.deleteMany();
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const notificationController = {
    createNotify, getNotify, updateNotify, deleteNotify, deleteAll
}

export default notificationController;