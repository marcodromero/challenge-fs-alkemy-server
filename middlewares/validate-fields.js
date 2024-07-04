const {validationResult} = require('express-validator');
const resError = require('../helpers/resError');

const validateFields = (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      resError(res, 400, errors);
    }

    next();
}

module.exports ={
    validateFields
}