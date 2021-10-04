const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");
const { verifyUser, verifyAdmin, getToken } = require("./authenticate");
const passport = require("passport");
const User = require("./users");
userRouter.route("/").get(verifyUser, verifyAdmin, (req, res, next) => {
	User.find({}, (err, users) => {
		if (err) next(createError(err));
		else res.json(users);
	});
});

userRouter
	.route("/login")
	.get((req, res) => {
		res.end("user Login");
	})
	.post(passport.authenticate("local"), (req, res) => {
		const token = getToken({ _id: req.user._id });
		res.json({ token, msg: "login successful!" });
	});

userRouter
	.route("/signup")
	.get((req, res) => {
		res.end("user signup");
	})
	.post((req, res, next) => {
		User.register(
			new User({ username: req.body.username }),
			req.body.password,
			(err, user) => {
				if (err) next(createError(403, "user exist"));
				else
					passport.authenticate("local")(req, res, () => {
						res.json({ user, msg: "signup successful!" });
					});
			}
		);
	});

module.exports = userRouter;
1;
