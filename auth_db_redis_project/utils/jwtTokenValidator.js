/**
 * Middleware to verify JWT token from the Authorization header.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * Done
 */

import jwt from "jsonwebtoken";
import 'dotenv/config'

const secretKey = process.env.SECREY_KEY

export default function jwtTokenValidator(req,res,next){
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Header Not found")
        // return res.status(401).json({ error: 'Authorization token missing or malformed' });
        return res.redirect('/login')
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // return res.status(401).json({ error: 'Token has expired' });
                return res.redirect('/login');
            }
            // return res.status(401).json({ error: 'Invalid token' });
            return res.redirect('/login');
        }

        // Attach decoded payload to request object
        req.user = decoded;

        next(); // Pass control to the next middleware or route handler
    });
}

