import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';


// Import custom modules and routes
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
import jobsApiRoutes from './routes/api/jobsApiRoutes.js';



// Initialize environment variables and app
dotenv.config();
const app = express();
const __dirname = path.resolve(); // Resolve absolute path
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5000', credentials: true })); // Allow frontend CORS
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretkeynotworking',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        },
    })
);
app.get('/test-session', (req, res) => {
    if (req.session.lic_no) {
        return res.json({ message: `License number is: ${req.session.lic_no}` });
    }
    res.status(400).json({ message: 'License number missing in session.' });
});
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/utils', express.static(path.join(__dirname, 'utils'))); // Serve utils folder

// API Routes
app.use('/api', apiRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/customers', customerApiRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/auth', authApiRoutes);
app.use('/api/sessions', sessionApiRoutes);
app.use('/api/links', linkApiRoutes);
app.use('/api/customer', customerApiRoutes);
app.use('/api/categories', categoryApiRoutes);
app.use('/api/markups', markUpApiRoutes);
app.use('/api/inventory', inventoryApiRoutes);
app.use('/api/jobs', jobsApiRoutes);






app.get('/jobs/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'job_card.html'))
});
// Serve HTML files for specific routes
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
);
app.get('/registration', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'userRegistration.html'))
);
app.get('/dashboard', authMiddleware, (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'))
);
app.get('/customer', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'customer.html'))
);
app.get('/business', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'business.html'))
);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Database connection and server startup
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
