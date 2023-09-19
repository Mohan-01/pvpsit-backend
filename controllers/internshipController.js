import Internship from "../models/internshipModel.js";
import handlerFactory from "./handlerFactory.js";
// import AppError from '../utils/appError.js';

/*
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // error, dest
        cb(null, 'public/img/')
    },
    filename: (req, file, cb) => {
        // internship-internshipID-currTimestamp.extension
        const ext = file.mimetype.split('/')[1];
        cb(null, `internship-${Date.now()}-${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image'))
        cb(null, true);
    else cb(new AppError('Not an image! Please upload only image.', 400), false);
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const imgUpload = upload.single('coverImg');

const resizeImg = (req, res, next) => {
    console.log(`body`, req.body);
    if(!req.file) return next();
    console.log('file: ', req.file);
    req.file.filename = `internship-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/internships/${req.file.filename}`);
    next();
}
*/
const create = handlerFactory.create(Internship);
const getAll = handlerFactory.getAll(Internship);
const getById = handlerFactory.getById(Internship);
const update = handlerFactory.update(Internship);
const deletee = handlerFactory.deletee(Internship);
const deleteAll = handlerFactory.deleteAll(Internship);

const internshipController = {
    create, getAll, update, deletee, deleteAll, getById
}

export default internshipController;