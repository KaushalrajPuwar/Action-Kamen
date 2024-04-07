const bcrypt = require('bcrypt')
const localstrat = require('passport-local').Strategy


function initialize(passport, getUserByRoll, getUserById) {
    const authenticateUser = async (rollno, password, done) => {
        const user = getUserByRoll(rollno)
        if (user == null){
            return done(null, false, {message: "No user with that Rollno"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: "Password Incorrect"});
            }

        }catch (e){
            return done(e)
        }

    }
    passport.use(new localstrat({ usernameField: 'rollno' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => { return done(null, getUserById(id)); });
}

module.exports = initialize
