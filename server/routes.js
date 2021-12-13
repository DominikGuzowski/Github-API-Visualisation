const express = require('express');
const router = express.Router();
const services = require('./services');


router.get("/test", (req, res) => {
    console.log("hello")
    res.status(200).json({result:"hello 1"})
})
router.get("/get/:service/:input", (req, res) => {
    console.log("UNIVERSAL ROUTE");

    res.status(200).json({result: "Hello"});
});

router.get("/get/Profile/:age/:name/:nationality", (req, res) => {
    console.log("PROFILE - NON-UNIVERSAL");
    services.Profile(req.params).then(result => res.send({result: result}));
})

router.get("/get/CalculateAge/:year/:month/:day",  (req, res) => {
    console.log("CalculateAge - NON-UNIVERSAL");
    services.CalculateAge({year: req.params.year, month: req.params.month, day: req.params.day }).then(result => res.send({result: result}));
})
module.exports = router;