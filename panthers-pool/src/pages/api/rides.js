import Rides from "/panthers-pool/models/rides.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
    try {
        const { riderID, driverID } = req.query;

        let query = Rides.query().select('destination', 'departureTime');
       
        if (riderID) {
            const riderIDs = riderID.split(','); 
            query = query.whereIn('riderID', riderIDs).where('complete', true); 
            const rides = await query;

            const response = rides.map(ride => ({
                driverID: ride.driverID,
                destination: ride.destination,
                departureTime: ride.departureTime,
            }));
            return res.json(response);
        }

        if (driverID) {
            query = query.where('driverID', driverID).where('Completed', true);
            const rides = await query;

            const response = rides.map(ride => ({
                riderIDs: ride.riderID,  // This is an array, so it returns the riders' IDs
                destination: ride.destination,
                departureTime: ride.departureTime,
            }));

            return res.json(response);
        }
       
        res.json(rides);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rides' });
    }
});

export default router;