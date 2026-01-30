import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({limit :"16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb"}));

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],    
}));

import healthCheckRouter from "./routes/healthcheck.routes.js"; 
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/healthCheck", healthCheckRouter);

app.get("/", (req, res) => {
    res.send("welcome to proj_management");
});

export default app;