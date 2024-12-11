/**
 * Global Error Handler
 *
 * @param {Error} err - The error object
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {Function} next - The next middleware function
 */

export default function globalErrorHandler(err,req,res){
    const statusCode = err.status || 500
    const errMessage = err.message || 'Server Error'

    console.error('Error:', {
        message: err.message,
        stack: err.stack, // Include stack trace for debugging
        statusCode
    });

    // res.status(statusCode).json(
    //     {success: false,
    //      statusCode,
    //      message: errMessage
    //     }
    // )
}