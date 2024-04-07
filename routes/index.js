if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express = require('express');
var app = express();
var bcrypt = require('bcrypt')
var passport = require('passport')
var session = require('express-session')
var flash = require('express-flash')
const methodOverride = require("method-override");

const initializePassport = require("../passport-config");
initializePassport(
  passport,
  rollno => users.find((user) => user.rollno == rollno),
  id => users.find((user) => user.id == id)
);
 

var router = express.Router();
app.use(express.urlencoded({ extended: false }));
app.use(flash)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

const users = []

let taxiPooling = require("../controllers/taxiPooling")
let mySchedule = require("../controllers/mySchedule");
let aboutUs = require("../controllers/aboutUs");

router.get("/", (req, res) => {
  res.render("../views/henlo.ejs");
});


/* GET home page. */
router.get("/login", (req, res) => {
  res.render("../views/landing.ejs");
})

router.post("/login", (res, req)=> {res.send(initializePassport)}, passport.authenticate('local', {
    successRedirect: '/taxiPooling',
    failureRedirect: '/',
    failureFlash: true
}))

/*GET register page */
router.get("/register", (req, res) => {
  res.render("../views/register.ejs");
})
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      rollno: req.body.rollno,
      phone: req.body.phone,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/aboutUs");
  }
  next();
}

/* GET taxi page */
router.get('/taxiPooling', taxiPooling.get_taxi)
router.post('/taxiPooling', taxiPooling.get_taxi)

/* GET schedule page */
router.get("/mySchedule", mySchedule.get_schedule);

/* GET about page */
router.get("/aboutUs", aboutUs.get_about);
router.post("/aboutUs", aboutUs.get_about);

module.exports = router;
