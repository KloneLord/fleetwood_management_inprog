import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';


import path from 'path';
import connectDB from './config/dbConfig.js';
import authMiddleware from './middleware/authMiddleware.js';
import apiRoutes from './routes/apiRoutes.js';
import sessionRoutes from './routes/views/sessionRoutes.js';
import businessRoutes from './routes/api/businessApiRoutes.js';
import customerApiRoutes from './routes/api/customerApiRoutes.js';
import authApiRoutes from './routes/api/authApiRoutes.js';
import sessionApiRoutes from './routes/api/sessionApiRoutes.js';
import linkApiRoutes from './routes/api/linkApiRoutes.js';
import categoryApiRoutes from './routes/api/categoryApiRoutes.js';
import markUpApiRoutes from './routes/api/markUpApiRoutes.js';
import inventoryApiRoutes from './routes/api/inventoryApiRoutes.js';

dotenv.config();

const __dirname = path.resolve(); // Absolute path to the working directory

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public folder

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretkeynotworking',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            sameSite: 'lax', // Ensure cookies are properly shared in modern browsers
            maxAge: 60 * 60 * 1000, // 1 hour session
        },
    })
);

// API Routes
app.use('/api', apiRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/customer', customerApiRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/auth', authApiRoutes);
app.use('/api/sessions', sessionApiRoutes);
app.use('/api/links', linkApiRoutes);
app.use('/api/customers', customerApiRoutes);
app.use('/api/categories', categoryApiRoutes);
app.use('/api/markups', markUpApiRoutes);
app.use('/api/inventories', inventoryApiRoutes); // Add inventory routes

app.get('/dashboard', authMiddleware, (req, res) => {
    console.log('Serving dashboard to authenticated user:', req.session.user);
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Routes for registration and login
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userRegistration.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Static routes for additional pages
app.get('/customer', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/customer.html'))
);


app.get('/business', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/business.html'))
);

app.use('/utils', express.static(path.join(__dirname, 'utils'))); // Serve utils folder

// Database Connection & Server Start
(async () => {
    try {
        await connectDB(); // Connect to the database

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err.message);
        process.exit(1);
    }
})();
