const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

//   /api/auth/register
router.post(
    '/register',
    [check('email', 'Entered email is incorrect!').isEmail(), check('password', 'Password must contain at least 6 symbols!').isLength({ min: 6 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Enter correct values in registration fields',
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'User with this mail already exists!' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: 'User succesfuly create!' });
        } catch (e) {
            res.status(500).json({ message: 'Something going wrong, try again' });
        }
    }
);

//   /api/auth/login
router.post(
    '/login',
    [check('email', 'Enter correct email').normalizeEmail().isEmail(), check('password', 'Enter password').exists()],

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Enter correct data in login fields',
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                res.status(400).json({ message: 'User doesnt exist with this mail!' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(400).json({ message: 'Incorrect password, try again' });
            }

            //autorization with jwt token

            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: 'Something going wrong, try again' });
        }
    }
);

module.exports = router;
