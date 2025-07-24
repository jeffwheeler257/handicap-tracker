import { Response, Request } from "express";

class HealthController {
    async healthCheck(req: Request, res: Response) {
        res.status(200).send("Health Check");
    }
}

export default new HealthController();