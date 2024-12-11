import {body,validationResult} from "express-validator";

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

function comparePass(){
    return body('confirm-password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        })
}

function validateEmail(){
    return body('email')
        .isEmail()
        .withMessage('Enter a valid email')
        .notEmpty()
        .withMessage(`email is required`)
        .escape()
}

function validateOptionalField(param) {
    return body(param)
        .optional()
        .isString()
        .trim()
        .escape();
}

export const validateRegister = [
    validateUser('username'),
    validatePass('password'),
    validateEmail(),
    comparePass()
]

export const validateLogin = [
    validateEmail(),
    validatePass('password')
]

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
