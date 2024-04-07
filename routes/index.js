var express = require('express');
var router = express.Router();


let landing = require("../controllers/landing")
let register = require("../controllers/register")
let taxiPooling = require("../controllers/taxiPooling")
let mySchedule = require("../controllers/mySchedule");
let aboutUs = require("../controllers/aboutUs");

router.get("/", (req, res) => {
  res.render("../views/henlo.ejs");
});

/* GET home page. */
router.get("/login", landing.get_landing)
router.post("/login", landing.get_landing)

/*GET register page */
router.get("/register", register.get_register)
router.post("/register", register.get_register);

/* GET taxi page */
router.get('/taxiPooling', taxiPooling.get_taxi)
router.post('/taxiPooling', taxiPooling.get_taxi)

/* GET schedule page */
router.get("/mySchedule", mySchedule.get_schedule);
router.post("/mySchedule", mySchedule.get_schedule);

/* GET about page */
router.get("/aboutUs", aboutUs.get_about);
router.post("/aboutUs", aboutUs.get_about);

module.exports = router;







/* app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}); */
