import HackAThon from "../models/hackAThonModel.js";
import handlerFactory from "./handlerFactory.js";

const create = handlerFactory.create(HackAThon);
const getAll = handlerFactory.getAll(HackAThon);
const getById = handlerFactory.getById(HackAThon);
const update = handlerFactory.update(HackAThon);
const deletee = handlerFactory.deletee(HackAThon);
const deleteAll = handlerFactory.deleteAll(HackAThon);

const hackAThonController = {
    create, getAll, update, deletee, deleteAll, getById
}

export default hackAThonController;