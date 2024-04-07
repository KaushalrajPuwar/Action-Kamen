var express = require('express');
var bcrypt = require('bcrypt')
 
var app = express();
var router = express.Router();
app.use(express.urlencoded({ extended: false }));

const userss = []

let landing = require("../controllers/landing")
let taxiPooling = require("../controllers/taxiPooling")
let mySchedule = require("../controllers/mySchedule");
let aboutUs = require("../controllers/aboutUs");

/* GET home page. */
router.get('/', landing.get_landing);

router.post('/', async (req, res) => {
    const hased = await bcrypt.hash(req.body.pwd, 10)
    userss.push({
        id: Date.now().toString(),
        roll: req.body.rollno,
        pwd: hased
    })
    console.log(userss);
})

/* GET taxi page */
router.get('/taxiPooling', taxiPooling.get_taxi)
router.post('/taxiPooling', taxiPooling.get_taxi)

/* GET schedule page */
router.get("/mySchedule", mySchedule.get_schedule);

/* GET about page */
router.get("/aboutUs", aboutUs.get_about);
router.post("/aboutUs", aboutUs.get_about);

module.exports = router;
