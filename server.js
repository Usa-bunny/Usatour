const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo");
const path = require('path');
const dashboard = require("./routes/dashboard");
const usatour = require("./routes/usatour")

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use("/usatour", usatour);
app.use("/dashboard", dashboard);

app.get("/", (req, res) => {
  res.redirect("/usatour/listwisata");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

module.exports = app;
