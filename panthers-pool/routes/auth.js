const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
    // Rider Registration Route
    router.post('/register/rider', async (req, res) => {
        const { riderID, firstName, lastName, age, phone, email, password } = req.body;

        if (!email.endsWith('@middlebury.edu')) {
            return res.status(400).json({ error: 'Only middlebury.edu emails are allowed.' });
        }

        try {
            const existingUser = await db('rider').where({ email }).first();
            if (existingUser) return res.status(409).json({ error: 'Email already registered' });

            const password_hash = await bcrypt.hash(password, 10);

            await db('rider').insert({
                riderID,
                firstName,
                lastName,
                age,
                phone,
                email,
                password_hash
            });

            res.status(201).json({ message: 'Rider registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to register rider' });
        }
    });

    // Login Route (Check Rider Table)
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await db('rider').where({ email }).first();
            if (!user) return res.status(401).json({ error: 'Email not found' });

            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

            res.status(200).json({
                message: 'Login successful',
                riderID: user.riderID,
                firstName: user.firstName
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        }
    });

    return router;
};
