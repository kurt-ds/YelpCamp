const mongoose = require("mongoose");
const cities = require("./cities");
const { places, desriptors, descriptors } = require("./seedHelpers");

const Campground = require("../models/campgrounds");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]},
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: "64b25cf6482872b4027deeea",
      image:  [
        {
          url: 'https://res.cloudinary.com/dmwfs6glg/image/upload/v1689412923/YelpCamp/i6wxjcvsa8p8rus4ghpm.jpg',
          filename: 'YelpCamp/i6wxjcvsa8p8rus4ghpm',
        },
        {
          url: 'https://res.cloudinary.com/dmwfs6glg/image/upload/v1689412923/YelpCamp/kwchritbaivub4st37f4.jpg',
          filename: 'YelpCamp/kwchritbaivub4st37f4',
        },
        {
          url: 'https://res.cloudinary.com/dmwfs6glg/image/upload/v1689412924/YelpCamp/vz4lvgugaajwduzkxuqh.jpg',
          filename: 'YelpCamp/vz4lvgugaajwduzkxuqh',
        }
      ],
      price: Math.floor(Math.random() * 20) + 10,
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores fuga doloribus sapiente illum tenetur quas eligendi qui minus nisi accusantium, perferendis quidem sint nam consequatur provident quisquam corporis vitae dolores. Deserunt, ducimus. Provident enim error, atque quasi, laboriosam nisi rerum amet ducimus nemo, exercitationem ad neque autem veniam? A, saepe."
    });
    await camp.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
});
