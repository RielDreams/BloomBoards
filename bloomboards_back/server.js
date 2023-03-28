////////////////////
//PACKAGES
////////////////////
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const methodOverride = require("method-override");
const session = require("express-session");

////////////////////
//intializing
////////////////////
const server = express();

////////////////////
//DATA
////////////////////
const { Meats, Cheese, AddOns, Size } = require("./models/menuitem");
const Menu = require("./models/menu");
const { urlencoded } = require("express");
const accountController = require("./controller/account");
const userController = require("./controller/users");
const ordersController = require("./controller/orders");
const menuController = require("./controller/menu");

////////////////////
//CONFIG
////////////////////
const PORT = process.env.PORT || 4000;
const DATABASE_URI = process.env.DATABASE_URI;

////////////////////
//MIDWARE
////////////////////
const db = mongoose.connection;
server.use(express.static("./public"));
server.use(methodOverride("_method"));
server.use(urlencoded({ extended: false }));
server.use(express.json());
server.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


////////////////////
//ROUTES
////////////////////

////////////////////
//controller
server.use("/orders", ordersController);
server.use("/account", accountController);
server.use("/user", userController);
server.use("/menu", menuController);

////////////////////
//INDEX
server.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  });
});

server.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    currentUser: req.session.currentUser,
  });
});


////////////////////
//SEED/CREATE
////////////////////


////////////////////
//LISTENING
////////////////////
server.listen(PORT, () => {
  console.log(`BloomBoards is now online at ${PORT}`);
  console.log(DATABASE_URI)
});
db.on("error", (err) =>
  console.log("an error occured with mongodb " + err.message)
);
db.on("connected", () =>
  console.log(`connected to mongoDB on ${db.host}:${db.port}`)
);
db.on("disconnected", () => console.log("mongod disconnected"));
// TODO: refer back to dustin post on partytime to set limters
