import cors from "cors";
import express from "express";
import { usersRoutes } from "./src/routes/usersRoutes.js";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.use('/users', usersRoutes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});