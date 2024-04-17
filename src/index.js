const express = require("express");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const { connectDB } = require("./config");

const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hola amigo" });
});

app.listen(port, () =>
  console.log(`Server running in port http://localhost:${port}`)
);
