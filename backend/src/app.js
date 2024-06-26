import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import RootRoutes from "./api/_routes/index.js";
import { getLocalIP } from "./features/utils/ip_helper.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", RootRoutes);

getLocalIP().then((ip) => {
  app.listen(3000, ip != null ? ip : "localhost", () => {
    console.log("Sunucu şu adreste çalışıyor", ip + ":" + 3000);
  });
});
