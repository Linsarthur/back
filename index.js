import cors from "cors";
import express from "express";
import { login } from "./src/controllers/usersControllers.js";
import { usersRoutes } from "./src/routes/usersRoutes.js";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const user = await login(req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.use('/users', usersRoutes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});