import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import cors from "cors";
import createConnection from "./database/connection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());
app.use('/', router);

createConnection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server has started at PORT ${PORT}`);
})