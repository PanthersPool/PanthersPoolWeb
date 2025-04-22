/*
import Rides from "/panthers-pool/models/rides.js";
import { createRouter } from "next-connect";
*/

/*
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

export default handler;
*/

import { knex } from "../../../knex/knex.js"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        const riderIdSearch = parseInt(req.query.riderIdSearch)
        const rides = await knex("rides").whereIn('rideID', function () {
            this.select("r.rideID")
            .from(knex.raw("rides AS r, json_each(r.riderID)"))
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
    }
    case "PATCH": {
        const newRiderID = req.body
        const { rideID } = req.query
        await knex("rides")
        .where({ rideID: rideID })
        .update({ riderID: JSON.stringify(newRiderID)})
        res.status(200).json({ message: "riderID updated successfully" })
        break;
      }

    default:
        res.setHeader("Allow", ["GET", "PATCH"]);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
}
