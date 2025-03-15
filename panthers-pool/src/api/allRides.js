import Rides from "panthers-pool/models/rides.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
    try {
        const rides = await Rides.query()
        .where('complete', false)
        .select();

        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
})

export default router.handler();