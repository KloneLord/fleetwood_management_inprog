import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';
import session from 'express-session';
import app from "bcrypt/promises.js";

export const authMiddleware = (req, res, next) => {
    console.log('Authenticating user for protected route...');

    // Check for session user
    if (!req.session || !req.session.user) {
        console.log('No active session found');
        return res.status(401).json({ message: 'Unauthorized: No active session' });
    }

    // Log session details for debugging
    console.log('Session found for user:', req.session.user);

    // Attach session user to request
    try {
        req.user = req.session.user;
        next(); // Proceed to next middleware or route
    } catch (err) {
        console.error('Error processing session user:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed
    }
    console.log('No active session found');
    return res.status(401).json({ error: 'Unauthorized' });
};


// Middleware to check user roles
export const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.session?.user?.role;
        if (allowedRoles.includes(userRole)) {
            return next();
        }
        res.status(403).send('Forbidden: You do not have access to this resource.');
    };
};



app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
}));


// Default export
export default authMiddleware;
