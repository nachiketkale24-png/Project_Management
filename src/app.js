import express from "express";

const app = express();

app.use(express.json({limit :"16kb"}));
app.use(express.urlendcoded({ extended: true, limit: "16kb"}));
app.use

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],    
}),
);
app.get("/", (req, res) => {
    res.send("welcome to proj_management");
});

export default app;