const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const DB = require("./db.js");

const PORT = process.env.PORT || 4005;

//import routes

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(express.static(path.resolve(__dirname, "client/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "2mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});

//api routes for auth and posts

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
