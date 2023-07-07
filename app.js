const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError');
const methodOverride = require("method-override");
const Campground = require("./models/campgrounds");
const Review = require('./models/review');
const { getSystemErrorMap } = require("util");

const campgroundRoutes = require('./routes/campground')
const reviewRoutes = require('./routes/reviews');

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));






app.get("/", (req, res) => {
  res.render("home");
});

//Campground Routes
app.use('/campgrounds', campgroundRoutes);

//Review Routes
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message =  'Oh No! Something Went Wrong';
    res.status(statusCode).render('error', {err});
});

app.listen(3000, () => {
  console.log("Serving on port 3000!");
});
