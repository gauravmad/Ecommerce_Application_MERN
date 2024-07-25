const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes =require("./routes/orderRoutes");
const paymentRoutes=require("./routes/paymentRoutes");
const reviewsRoute =require("./routes/reviewsRoutes");
app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || "5000";

connectDatabase();

app.use("/api/", userRoutes);
app.use("/api/", productRoutes);
app.use("/api/",orderRoutes);
app.use("/api/",paymentRoutes);
app.use("/api/",reviewsRoute);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});