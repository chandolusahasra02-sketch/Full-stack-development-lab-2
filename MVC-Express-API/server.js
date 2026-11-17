const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const movieRoutes = require("./routes/movieRoutes");

app.use("/api/v1/movies", movieRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});