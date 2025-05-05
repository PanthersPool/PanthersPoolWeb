const express = require('express');
const cors = require('cors');
const db = require('./knex/knex.js')

console.log("ENV:", process.env.NODE_ENV);
console.log("Using DB file:", db.client.config.connection.filename);


// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes(db));

// API Route to Fetch All Rides
app.get('/api/allRides', async (req, res) => {
    try {
        let rides 
        if(req.query.driverID !== undefined){
            rides = await db('rides').where({ driverID: req.query.driverID }).select('*');
        }else{
            rides = await db('rides').select('*');
        }
        
        const parsedRides = rides.map(ride => ({
            ...ride,
            riderID: typeof ride.riderID === 'string'
            ? JSON.parse(ride.riderID)
            : ride.riderID
          }))
          const parsedRides2 = parsedRides.map(ride => ({
            ...ride,
            requests: typeof ride.requests === 'string'
            ? JSON.parse(ride.requests)
            : ride.requests
          }))
        res.json(parsedRides2);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/rides', async (req, res) => {
    try{ 
        const riderIdSearch = parseInt(req.query.riderIdSearch)
        const rides = await db("rides").whereIn('rideID', function () {
            this.select("r.rideID")
            .from(db.raw("rides AS r, json_each(r.riderID)"))
            .where("json_each.value", riderIdSearch)
        }).select("*")
        const parsedRide = rides.map((ride) => ({
            ...ride,
            riderID: typeof ride.riderID === 'string'
            ? JSON.parse(ride.riderID)
            : ride.riderID
        }))
        const parsedRide2 = parsedRide.map((ride) => ({
            ...ride,
            requests: typeof ride.requests === 'string'
            ? JSON.parse(ride.requests)
            : ride.requests
        }))
        res.status(200).json(parsedRide2)
    }catch (error) {
        console.error("Error in rides", error)
        res.status(500).json({ error: "Internal server error", details: error.message });

    }
})

app.get('/api/getRiderRequests', async (req, res) => {
    try{ 
        const riderIdSearch = parseInt(req.query.riderIdSearch)
        const rides = await db("rides").whereIn('rideID', function () {
            this.select("r.rideID")
            .from(db.raw("rides AS r, json_each(r.requests)"))
            .where("json_each.value", riderIdSearch)
        }).select("*")
        const parsedRide = rides.map((ride) => ({
            ...ride,
            riderID: typeof ride.riderID === 'string'
            ? JSON.parse(ride.riderID)
            : ride.riderID
        }))
        const parsedRide2 = parsedRide.map((ride) => ({
            ...ride,
            requests: typeof ride.requests === 'string'
            ? JSON.parse(ride.requests)
            : ride.requests
        }))
        res.status(200).json(parsedRide2)
    }catch (error) {
        console.error("Error in rides", error)
        res.status(500).json({ error: "Internal server error", details: error.message });

    }
})

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
        const { riderID } = req.query
        if(Array.isArray(riderID)){
            const riderRequests = {}

            const riderPromises = await Promise.all(
                riderID.map(async (id) => {
                    const riderInfo = await db("rider").where({ riderID: id }).select('*')
                    return { id, riderInfo}
                })
            )

            riderPromises.forEach(({ id, riderInfo }) => {
                riderRequests[id] = riderInfo[0]
            })
                 
            res.status(200).json(riderRequests)
            
            
        }else{
            const rider = await db('rider').where({ riderID : riderID }).select()
            res.json(rider)
        }
    } catch (error) {
        console.error('Rider query error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.patch('/api/allRides', async(req,res) => {
    try{
        const newRequests = req.body
        await db("rides")
        .where({ rideID: req.query.rideID })
        .update({ requests: JSON.stringify(newRequests)})
        res.json(newRequests)
    } catch (error) {
        console.error('Rider insert error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.post('/api/allRides', async(req, res)=> {
    try {
        const rideToPost = req.body
        await db("rides").insert({
            rideID: rideToPost.rideID,
            driverID: rideToPost.driverID,
            origin: rideToPost.origin,
            destination: rideToPost.destination,
            departureTime: rideToPost.departureTime,
            spotsRemaining: rideToPost.spotsRemaining,
            luggageSpace: rideToPost.bags,
            atLeastOnePassenger: rideToPost.atLeastOnePassenger,
            Completed: rideToPost.Completed,
            riderID: JSON.stringify(rideToPost.riderID),
            requests: JSON.stringify(rideToPost.requests),
            price: rideToPost.price
        })
        res.status(200).json({ message: "ride inserted successfully" })
    }catch (error) {
        console.error('Ride insert error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.patch('/api/rides', async(req,res) => {
    try{
        const newRiderID = req.body
        const { rideID } = req.query
        await db("rides")
        .where({ rideID: rideID })
        .update({ riderID: JSON.stringify(newRiderID)})
        res.status(200).json({ message: "riderID updated successfully" })
        
    } catch (error) {
        console.error('RiderID insert error', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.patch('/api/cancelRideRequest', async(req,res) => {
    try{
        const { riderID }= req.body
        const { rideID } = req.query
        const [ride] = await db("rides")
        .where({ rideID: rideID }).select('*')

        let requests = ride.requests

        if (typeof requests === 'string') {
          requests = JSON.parse(requests);
        }

        const newRiderIDs = requests.filter((currentRiderIDs) => Number(currentRiderIDs) !== Number(riderID))
        
        await db("rides")
        .where({ rideID: rideID })
        .update({ requests: JSON.stringify(newRiderIDs)})
        res.status(200).json({ message: "ride canceled successfully" })
    }catch (error) {
        console.error("Cancel Ride Request error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
    
})

app.patch('/api/cancelConfirmedRide', async(req,res) => {
    try{
        const { riderID } = req.body
        const { rideID } = req.query
        const [ride] = await db("rides")
        .where({ rideID: rideID }).select('*')
        let riderIDs = ride.riderID

        if (typeof riderIDs === 'string') {
          riderIDs = JSON.parse(riderIDs);
        }
        
        const newRiderIDs = riderIDs.filter((currentRiderIDs) => Number(currentRiderIDs) !== Number(riderID))

        console.log("Current riderIDs:", riderIDs);
        console.log("riderID to remove:", riderID);
        console.log("Filtered riderIDs:", newRiderIDs);

        
        await db("rides")
        .where({ rideID: rideID })
        .update({ riderID: JSON.stringify(newRiderIDs)})
        res.status(200).json({ message: "ride canceled successfully" })
    }catch (error) {
        console.error("Cancel Confirmed Ride error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.delete('/api/cancelRideRequest', async(req,res) => {
    try{
        const {rideID} = req.query
        await db("rides").where({ rideID: rideID }).del()
    }catch(error){
        console.error("Cancel Ride error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
