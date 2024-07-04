const { OperationsService } = require("../services");
const { OperationError } = require("../helpers/errors");
const { catchedAsync, response, getVerifiedAmount} = require("../helpers");
const operationsService = new OperationsService;

const getAllOperations = async (req, res) => {
    const userId = req.user.id;
    const { categoryId } = req.query;
    const operations = categoryId
    ? await operationsService.getOperations({userId, categoryId})
    : await operationsService.getOperations({userId})
    response(res, 200, operations);
};

const getOperationById = async (req, res) => {
    const userId = req.user.id;
    const operationId = req.params.id;
    const operation = await operationsService.getOperation({
      userId,
      operationId,
    });
    if(!operation) throw new OperationError("ID invalido");
    response(res, 200, operation);
};

const createOperation = async (req, res) => {
    const userId = req.user.id;
    console.log(req.body);
    let { type, amount, ...data } = req.body;
    amount = getVerifiedAmount({ type, amount });
    const operation = await operationsService.createOperation({
      ...data,
      userId,
      amount,
      type,
    });
    response(res, 201, operation);
};

const updateOperation = async (req, res) => {
    const userId = req.user.id;
    const operationId = req.params.id;
    let { type, amount, ...data } = req.body;
    const { typeOperation } = await operationsService.getOperation({
      userId,
      operationId,
    });
    const verifiedAmount = getVerifiedAmount({ type: typeOperation, amount });
    data = { ...data, amount: verifiedAmount };
    const operation = await operationsService.updateOperation({
      userId,
      operationId,
      data,
    });
    if(!operation) throw new OperationError("ID invalido");
    response(res, 200, operation);
};

const deleteOperation = async (req, res) => {
    const operationId = req.params.id;
    const operation = await operationsService.deleteOperation(
      operationId
    );
    if(!operation) throw new OperationError("ID invalido");
    response(res, 200, operation);
};

module.exports = {
  getOperationById: catchedAsync(getOperationById),
  getAllOperations: catchedAsync(getAllOperations),
  updateOperation: catchedAsync(updateOperation),
  createOperation: catchedAsync(createOperation),
  deleteOperation: catchedAsync(deleteOperation)
};
