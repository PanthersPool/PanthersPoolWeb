import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "PATCH": {
        const { riderID } = req.body
        const { rideID } = req.query
        const [ride] = await knex("rides")
        .where({ rideID: rideID }).select('*')

        let requests = ride.requests

        if (typeof requests === 'string') {
          requests = JSON.parse(requests);
        }

        const newRiderIDs = requests.filter((currentRiderIDs) => Number(currentRiderIDs) !== Number(riderID))

        await knex("rides")
        .where({ rideID: rideID })
        .update({ requests: JSON.stringify(newRiderIDs)})
        res.status(200).json({ message: "ride canceled successfully" })
        break;
      }
      case "DELETE": {
        const {rideID} = req.query
        await knex("rides").where({ rideID: rideID }).del()
        break;
      }
      default:
        res.setHeader("Allow", ["DELETE", "PATCH"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }