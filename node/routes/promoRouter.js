const express = require("express");

const Promotions = require("../models/Promotion");

const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter
	.route("/")
	.get((req, res, next) => {
		Promotions.find({})
			.then(
				(promotions) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promotions);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Promotions.create(req.body)
			.then(
				(promotion) => {
					console.log("Promotion Created ", promotion);
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(dish);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /promotions");
	})
	.delete((req, res, next) => {
		Promotions.remove({})
			.then(
				(promo) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promo);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

promoRouter
	.route("/:promoId")
	.get((req, res, next) => {
		Promotions.findById(req.params.promoId)
			.then(
				(promo) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promo);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end(
			"POST operation not supported on /promotions/" + req.params.promoId
		);
	})
	.put((req, res, next) => {
		Promotions.findByIdAndUpdate(
			req.params.promoId,
			{
				$set: req.body,
			},
			{ new: true }
		)
			.then(
				(promo) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promo);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Promotions.findByIdAndRemove(req.params.promoId)
			.then(
				(resp) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(resp);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

module.exports = promoRouter;
