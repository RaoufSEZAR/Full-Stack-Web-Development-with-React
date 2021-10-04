const express = require("express");
const Dish = require("./dishes");
const createError = require("http-errors");
const dishRouter = express.Router();
const { verifyUser, verifyAdmin } = require("./authenticate");
dishRouter
	.route("/")
	.get(async (req, res, next) => {
		const data = await Dish.find().populate("comments.author");
		if (data.length !== 0) {
			res.json(data);
		} else {
			res.json({ msg: `cann\'t find dishes` });
		}
	})

	.post(verifyUser, verifyAdmin, async (req, res, next) => {
		const data = req.body;
		try {
			const result = await Dish.create(data);
			res.json({ Dish: result });
		} catch (error) {
			next(createError(error));
		}
	})

	.put(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({ msg: "please use dish id" });
	})

	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		res.json({ msg: "please use dish id" });
	});

dishRouter
	.route("/:dishId")
	.get(async (req, res) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		if (data) {
			res.json({ data });
		} else {
			res.json({ msg: `cann\'t find ${req.params.dishId} Dish` });
		}
	})

	.post(verifyUser, verifyAdmin, (req, res, next) => {
		const data = req.body;
		Dish.create(data)
			.then((result) => {
				res.json({ dish: result });
			})
			.catch((err) => {
				next(createError(err));
			});
	})

	.put(verifyUser, verifyAdmin, (req, res, next) => {
		const data = req.body;
		Dish.updateOne({ name: req.params.dishId }, data)
			.then((result) => {
				if (result.matchedCount === 0) {
					res.json({ msg: `can\'t find ${req.params.dishId}` });
				} else {
					Dish.findOne({ name: req.params.dishId })
						.populate("comments.author")
						.then((dish) => {
							res.json({ dish });
						})
						.catch((err) => {
							next(createError(err));
						});
				}
			})
			.catch((err) => {
				next(createError(err));
			});
	})

	.delete(verifyUser, verifyAdmin, (req, res, next) => {
		Dish.deleteOne({ name: req.params.dishId })
			.then((result) => {
				if (result.deletedCount !== 0) {
					res.json({ msg: "successful" });
				} else {
					res.json({ msg: `can\'t find ${req.params.dishId}` });
				}
			})
			.catch((err) => {
				next(createError(err));
			});
	});
dishRouter
	.route("/:dishId/comments")
	.delete(verifyUser, verifyAdmin, async (req, res, next) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		if (data) {
			data.comments = [];
			data.save((err, comments) => {
				if (err) next(createError(403), err);

				res.json({ comments: data.comments });
			});
		} else {
			res.json({ msg: `cann\'t find ${req.params.dishId} Dish` });
		}
	})
	.post(verifyUser, async (req, res, next) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		if (data) {
			req.body.author = req.user._id;
			data.comments.push(req.body);
			data.save((err, comments) => {
				if (err) next(createError(403), err);

				res.json({ comments: data.comments });
			});
		} else {
			res.json({ msg: `cann\'t find ${req.params.dishId} Dish` });
		}
	})
	.get(async (req, res, next) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		if (data) {
			res.json({ comments: data.comments });
		} else {
			res.json({ msg: `cann\'t find ${req.params.dishId} Dish` });
		}
	});

dishRouter
	.route("/:dishId/comments/:commentId")
	.delete(verifyUser, async (req, res, next) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		const comment = data.comments.id(req.params.commentId);
		try {
			if (!comment.author._id.toString().includes(req.user._id)) {
				next(createError(403, "You cann't delete others comment"));
			} else {
				data.comments.id(req.params.commentId).remove();
				data.save();
				res.json({ msg: "successful!" });
			}
		} catch (error) {
			next(createError(403, "can't find this comment"));
		}
	})
	.put(verifyUser, async (req, res, next) => {
		const data = await Dish.findOne({ name: req.params.dishId }).populate(
			"comments.author"
		);
		const comment = data.comments.id(req.params.commentId);
		if (!comment) {
			next(createError(403, "can't find this comment."));
		} else {
			if (comment.author._id.toString().includes(req.user._id)) {
				if (req.body.comment) comment.comment = req.body.comment;
				if (req.body.rating) comment.rating = req.body.rating;
				data.save();
				res.end("successful!");
			} else {
				next(createError(403, "You cann't edit others comment"));
			}
		}
	});
module.exports = dishRouter;
1;
