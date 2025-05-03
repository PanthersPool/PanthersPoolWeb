/*
import rides from "panthers-pool/models/rides.js";
import { createRouter } from "next-connect";
*/

import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        let rides
        if(req.query.driverID !== undefined){
          const { driverID } = req.query
          rides = await knex("rides").where({"driverID": driverID}).select("*")
        }else{
          rides = await knex("rides").select("*")
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
          res.status(200).json(parsedRides2);
          break;
        
      }
      case "PATCH": {
        const newRequests = req.body
        const { rideID } = req.query
        await knex("rides")
        .where({ rideID: rideID })
        .update({ requests: JSON.stringify(newRequests)})
        res.status(200).json({ message: "rides updated successfully" })
        break;
      }
      case "POST": {
        const rideToPost = req.body
        await knex("rides").insert({
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
          requests: JSON.stringify(rideToPost.requests)
        })
        res.status(200).json({ message: "ride inserted successfully" })
      }
      default:
        res.setHeader("Allow", ["GET", "PATCH", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

  /*
router.get(async (req, res) => {
    try {
        const ride = await rides.query()
        .where('complete', false)
        .select();

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
})
    */