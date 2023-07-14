const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campgrounds");
const Review = require("../models/review");
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
  
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;