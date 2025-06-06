/*

import Rider from "/panthers-pool/models/rider.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
    try {
        const rider = Rider.query()
        .select("firstName", "lastName", "email", "phone")
        .where('riderID', req.query.riderID).first();

        res.status(200).json(rider);
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
})

export default router.handler();
*/

import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        const { riderID } = req.query
        if(Array.isArray(riderID)){
          const riderRequests = {}

          const riderPromises = await Promise.all(
              riderID.map(async (id) => {
                  const riderInfo = await knex("rider").where({ riderID: id }).select('*')
                  return { id, riderInfo}
              })
          )

          riderPromises.forEach(({ id, riderInfo }) => {
              riderRequests[id] = riderInfo[0]
          })
               
          res.status(200).json(riderRequests)
          break;
        }else{  
          const rider = await knex("rider").where({'riderID': riderID }).select('*')
          res.status(200).json(rider);
          break;
        }
        
      }
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }