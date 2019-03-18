const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const users  = require('../models/users');
const keys = require('../config/keys');
const {google: {clientID, clientSecret}} = keys;

passport.serializeUser((user, done) => {
	done(null, user.id);
})

passport.deserializeUser((id, done) => {
	users.findById(id).then((user) => done(null, user));
})

passport.use(
		new GoogleStrategy({
			callbackURL: '/auth/google/redirect',
			clientID,
			clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		console.log('pasport calback fired \n');
		console.log('accesstoken = ', accessToken);
		console.log('profile = ', profile);	
		users.findOne({googleID: profile.id}).then((currentUser) => {
				if (currentUser) {
					console.log('user is = ', currentUser);
					done(null, currentUser);
				} else {	
					const user = new users({
						googleID: profile._json.sub,
						name: profile._json.name,
						gender: profile._json.gender,
						picture: profile._json.picture,
						email: profile._json.email,
						refreshToken,
						accessToken
					}).save().then((newUser) => {
						console.log('new user created ', newUser)
						done(null, newUser);
					});
				}
		})
	})
)