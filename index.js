import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

let myusername = process.env.database;

console.log("Username is: " + myusername);
console.log("start of an backend project");