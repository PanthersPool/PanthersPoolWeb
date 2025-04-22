import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "PATCH": {
        const {riderID} = req.body
        const { rideID } = req.query
        const [ride] = await knex("rides")
        .where({ rideID: rideID }).select('*')
        let riderIDs = ride.riderID

        if (typeof riderIDs === 'string') {
          riderIDs = JSON.parse(riderIDs);
        }
  
        const newRiderIDs = riderIDs.filter((currentRiderIDs) => Number(currentRiderIDs) !== Number(riderID))

        await knex("rides")
        .where({ rideID: rideID })
        .update({ riderID: JSON.stringify(newRiderIDs)})
        res.status(200).json({ message: "ride canceled successfully" })
        break;
      }
      default:
        res.setHeader("Allow", ["PATCH"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }