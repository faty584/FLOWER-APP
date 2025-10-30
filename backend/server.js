const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const stripeRoutes = require("./routes/stripe");
require("./utils/passport");


dotenv.config();

// Starting express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [`${process.env.FRONTEND_URL}`,
     `${process.env.ADMIN_URL}`,
      `${process.env.LOCAL_HOST}`],
  credentials: true,
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(passport.initialize());
app.use("/api/stripe", stripeRoutes);


// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Flower Delivery Website Backend");

});

const flowerRoutes = require("./routes/flowerRoutes");
app.use("/api/flowers", flowerRoutes);

const userRouter = require("./routes/userRoutes");
app.use("/api/users/", userRouter);

// Connecting to Mongo DB and starting the server

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB and server is on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('DB connection error:', error);
    })

