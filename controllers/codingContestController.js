import CodingContest from "../models/codingContestModel.js";
import handlerFactory from "./handlerFactory.js";

const create = handlerFactory.create(CodingContest);
const getAll = handlerFactory.getAll(CodingContest);
const getById = handlerFactory.getById(CodingContest);
const update = handlerFactory.update(CodingContest);
const deletee = handlerFactory.deletee(CodingContest);
const deleteAll = handlerFactory.deleteAll(CodingContest);

const codingContestController = {
    create, getAll, update, deletee, deleteAll, getById
}

export default codingContestController;