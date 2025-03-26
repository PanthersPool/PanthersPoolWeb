const express = require('express');
const cors = require('cors');
const knex = require('knex');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Configure Knex to connect to your SQLite database
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite' // Change this if your .db file is elsewhere
    },
    useNullAsDefault: true
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes(db));

// API Route to Fetch All Rides
app.get('/api/allRides', async (req, res) => {
    try {
        const rides = await db('rides').select('*'); // Change 'rides' to your actual table name
        res.json(rides);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/driver', async (req, res) => {
    try{
        const driver = await db('driver').where({ driverID : req.query.driverID }).select()
        res.json(driver)
    } catch (error) {
        console.error('Driver query error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/api/rider', async (req, res) => {
    try{
        const rider = await db('rider').where({ riderID : req.query.riderID }).select()
        res.json(rider)
    } catch (error) {
        console.error('Rider query error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
