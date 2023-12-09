import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import RootRoutes from "./api/_routes/index.js";
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

app.listen(process.env.PORT ?? 3000);

// import fs from "fs";

// const jsonDosya = JSON.parse(fs.readFileSync("iller.json", "utf-8"));
// const jsonDosya2 = JSON.parse(fs.readFileSync("vergi_daireleri.json", "utf-8"));

// jsonDosya.data.forEach((item) => {
//   jsonDosya2.data.forEach((item2) => {
//     if (item.plaka === item2.il_id) {
//       item2["il_adi"] = item.il_adi;
//     }
//   });
// });

// fs.writeFileSync("vergi_daireleri.json", JSON.stringify(jsonDosya2), "utf-8");
