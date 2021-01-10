const {check, validationResult} = require('express-validator');

exports.validateViewNumber= [
  check('productId')
    .not()
    .isEmpty()
    .withMessage('productId can not be empty!')
    .isNumeric()
    .withMessage('productId is not number'),
  check('ViewType')
    .not()
    .isEmpty()
    .withMessage('ViewType can not be empty!')
    .custom((value , { req })=>{
      if (value == "custom") {
        if (req.body.startDate && req.body.endDate) {
            return value;
        }
        throw new Error("please insert startDate and endDate")
      }else{
        return value;
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];