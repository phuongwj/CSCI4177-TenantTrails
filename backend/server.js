import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/router.js";

const app = express();
const PORT = 5003;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});