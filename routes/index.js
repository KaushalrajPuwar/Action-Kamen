// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }

var express = require('express');
var bcrypt = require('bcrypt')
var passport = require('passport')
var session = require('express-session')
var flash = require('express-flash')
var initpass = require("../passport-config.js");
// initpass(passport, 
//     rollno => {return users.find(user =>user.rollno == rollno)}
// )
 
var app = express();
var router = express.Router();
// app.use(express.urlencoded({ extended: false }));
// app.use(flash)
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize());
// app.use(passport.session());

const userss = []

let landing = require("../controllers/landing")
let taxiPooling = require("../controllers/taxiPooling")
let mySchedule = require("../controllers/mySchedule");
let aboutUs = require("../controllers/aboutUs");

/* GET home page. */
router.get('/', landing.get_landing);

// router.post('/', async (req, res) => {
//     if (req.body.formType == 'login')
//     {const hashed = await bcrypt.hash(req.body.password, 10)
//     userss.push({
//         id: Date.now().toString(),
//         roll: req.body.rollno,
//         pwd: hashed,
//         type: req.body.formType
//     })
//     console.log(userss)
//     res.redirect("/aboutUs");}
//     else{
        
//     }
// })

/* GET taxi page */
router.get('/taxiPooling', taxiPooling.get_taxi)
router.post('/taxiPooling', taxiPooling.get_taxi)

/* GET schedule page */
router.get("/mySchedule", mySchedule.get_schedule);

/* GET about page */
router.get("/aboutUs", aboutUs.get_about);
router.post("/aboutUs", aboutUs.get_about);

module.exports = router;
