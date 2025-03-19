/*
import rides from "panthers-pool/models/rides.js";
import { createRouter } from "next-connect";
*/

import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        const rides = await knex("rides").select("*")
        res.status(200).json(rides);
        break;
      }
      default:
        res.setHeader("Allow", ["GET"]);
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