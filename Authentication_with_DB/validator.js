import {body, validationResult} from 'express-validator';

// function validateUser(param){
//     return body(param)
//             .notEmpty()
//             .isAlphanumeric()
//             .withMessage('Username must contain only letters and numbers')
//             .escape()
// }
//
// function validatePass(param){
//     return body(param)
//             .isLength({ min: 8 })
//             .withMessage('Password must be at least 8 characters long')
//
// }

function validateUser(param) {
    return body(param)
        .notEmpty()
        .withMessage(`${param} is required`)
        .isAlphanumeric()
        .withMessage(`${param} must contain only letters and numbers`)
        .escape();
}

function validatePass(param) {
    return body(param)
        .notEmpty()
        .withMessage(`${param} is required`)
        .isLength({ min: 8 })
        .withMessage(`${param} must be at least 8 characters long`)
        .escape();
}

function validateOptionalField(param) {
    return body(param)
        .optional()
        .isString()
        .trim()
        .escape();
}


// Register Validation Rules
export const registerUser = [validateUser('user'),validatePass('password')];

// Login Validation Rules
export const loginUser = [validateUser('loginUser'),validatePass('loginPass')];

// Middleware to Handle Validation Errors

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }
    next();
};


// export const validate = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };
