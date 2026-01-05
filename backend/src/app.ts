import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";

dotenv.config();

import { FRONTEND_URL } from "./config";

import { openapiSpec } from "./openapi";

import productsRoute from "./routes/product";
import customersRoute from "./routes/customer";
import ordersRoute from "./routes/order";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use("/products", productsRoute);
app.use("/customers", customersRoute);
app.use("/orders", ordersRoute);

app.get("/openapi.json", (_req, res) => {
  res.json(openapiSpec);
});

app.get("/docs", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public/docs.html"));
});

export default app;
