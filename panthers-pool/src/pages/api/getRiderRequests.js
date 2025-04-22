
import { knex } from "../../../knex/knex.js"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        const riderIdSearch = parseInt(req.query.riderIdSearch)
        const rides = await knex("rides").whereIn('rideID', function () {
            this.select("r.rideID")
            .from(knex.raw("rides AS r, json_each(r.requests)"))
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

    default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
  }
}
