/*
import Driver from "panthers-pool/models/driver.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
    try {
    const driver = await Driver.query()
    .select("firstName", "lastName", "email", "phone", "carColor", "carMake", "carPlate")
    .where('driverID', req.query.driverID).first();
    
    res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({error: "internal server error"});
    }
});

export default router.handler();
*/

import { knex } from "../../../knex/knex"

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
      case "GET": {
        const driver = await knex("driver").where({'driverID': req.query.driverID}).select('*')
        res.status(200).json(driver);
        break;
      }
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
