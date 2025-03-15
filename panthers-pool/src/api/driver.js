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
