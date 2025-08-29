import { Router } from "express";
import { getUsuarios } from "../controllers/usersControllers.js";

const router = Router();

router.get('/', async (req, res) => {
    res.send(await getUsuarios());
})


export { router as usersRoutes };
