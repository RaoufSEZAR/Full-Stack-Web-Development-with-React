const passport = require("passport");
const User = require("./user");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const config = require("./config");

exports.localPassport = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ _id: jwt_payload._id }, (err, user) => {
			if (err) done(err, false);
			else if (user) done(null, user);
			else done(null, false);
		});
	})
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
	if (req.user.isAdmin) next();
	else
		next(createError(403, "You are not authorized to perform this operation!"));
};
1;
