import { Router } from "express";
import { createUser, deleteUser, editUser, getUserById, getUsers } from "../controllers/usersControllers.js";

const router = Router();

router.get('/', async (req, res) => {
    res.send(await getUsers());
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(await getUserById(id));
})

router.post('/', createUser);
router.put('/:id', editUser);
router.delete('/:id',deleteUser);

export { router as usersRoutes };

