import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import sendMail from "../utils/sendMail.js";

const sendData = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data: data
    })
}


const create = Model => 
        catchAsync(async (req, res, next) => {
            console.log('body-back:', req.body); 
            const doc = await Model.create(req.body);
            sendMail(doc);
            sendData(res, 201, doc);
        })

const getAll = Model => 
        catchAsync(async (req, res, next) => {
            const features = new APIFeatures(Model.find(), req.query)
                // .filter()
                .sort()
                .limitFields()
                .paginate();
            // const doc = await Model.find();
            const doc = await features.query;
            if(!doc) return next(new AppError('There are no documents right now', 404));
            sendData(res, 200, doc);
        })
    
const getById = Model => 
        catchAsync(async (req, res, next) => {
            const doc = await Model.findById(req.params.id);
            if(!doc) return next(next(new AppError('There are no documents right now', 404)));
            sendData(res, 200, doc);
        })

const update = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!doc) return next(new AppError('There are no document with that referece', 404));
    sendData(res, 200, doc);
})

const deletee = Model => catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);
    console.log('deletee', req.params.id)
    sendData(res, 204, null);
})

const deleteAll = Model => catchAsync(async (req, res, next) => {
await Model.deleteMany();
    console.log('deleteAll')
    sendData(res, 204, null);
})


const handlerFactory = {
    create, getAll, update, deletee, deleteAll, getById
}

export default handlerFactory;