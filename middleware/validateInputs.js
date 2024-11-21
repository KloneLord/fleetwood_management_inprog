const validateInputs = (req, res, next) => {
    const { username, email, password } = req.body;

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password && password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (username && username.trim() === '') {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }

    next();
};

export default validateInputs;
