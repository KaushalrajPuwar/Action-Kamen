const { authenticate } = require('passport')
const bcrypt = require('bcrypt')
var localstrat = require('passport-local').Strategy


function initialise(passport, getUserByRoll) {
    const authenticateUser = async (rollno, password, done) => {
        const user = getUserByRoll(rollno)
        if (user == null){
            return done(null, false, {message: "No user with that Rollno"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }
            else{
                return done(null, false, {message: "Password Incorrect"});
            }

        }catch (e){
            return done(e)
        }

    }
    passport.use(new localstrat({ usernameField: 'rollno' }), authenticateUser)
    passport.serialiseUser((rollno, done) => { })
    passport.deserialiseUser((rollno, done) => {});
}

module.export = initialise
