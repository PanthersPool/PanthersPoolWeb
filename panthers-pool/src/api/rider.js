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