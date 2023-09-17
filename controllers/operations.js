const Operation = require("../models/operation");
const { OperationService } = require("../services");
const { getVerifiedAmount } = require("../helpers/getVerifiedAmount ");

const getOperations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.query;
    let query = { userId };

    if (categoryId) {
      query = { ...query, categoryId };
    }

    const operations = await OperationService.getOperations(query);

    res.json(operations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOperation = async (req, res) => {
  try {
    const userId = req.user.id;
    const operationId = req.params.id;

    const operation = await OperationService.getOperation({
      userId,
      operationId,
    });

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createOperation = async (req, res) => {
  try {
    const userId = req.user.id;
    let { type, amount, ...data } = req.body;
    amount = getVerifiedAmount({ type, amount });

    const operationCreated = await OperationService.createOperation({
      ...data,
      userId,
      amount,
      type,
    });

    res.status(201).json(operationCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateOperation = async (req, res) => {
  try {
    const userId = req.user.id;
    const operationId = req.params.id;
    let { type, amount, ...data } = req.body;

    const { typeOperation } = await OperationService.getOperation({
      userId,
      operationId,
    });

    const verifiedAmount = getVerifiedAmount({ type: typeOperation, amount });

    data = { ...data, amount: verifiedAmount };

    const updatedOperation = await OperationService.updateOperation({
      userId,
      operationId,
      data,
    });

    res.status(200).json(updatedOperation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOperation = async (req, res) => {
  try {
    const operationId = req.params.id;

    const deletedOperation = await OperationService.deleteOperation(
      operationId
    );

    res.status(200).json(deletedOperation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOperation,
  getOperations,
  updateOperation,
  createOperation,
  deleteOperation,
};
