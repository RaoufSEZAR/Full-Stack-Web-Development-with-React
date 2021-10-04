const express = require("express");

const Leaders = require("../models/Leader");

const leaderRouter = express.Router();

leaderRouter.use(express.json());

leaderRouter
	.route("/")
	.get((req, res, next) => {
		Leaders.find({})
			.then(
				(leaderes) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(leaderes);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Leaders.create(req.body)
			.then(
				(leader) => {
					console.log("leader Created ", leader);
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(leader);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /leaders");
	})
	.delete((req, res, next) => {
		Leaders.remove({})
			.then(
				(lead) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(lead);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

leaderRouter
	.route("/:leaderId")
	.get((req, res, next) => {
		Leaders.findById(req.params.leaderId)
			.then(
				(leader) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(leader);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end("POST operation not supported on /leaderes/" + req.params.leaderId);
	})
	.put((req, res, next) => {
		Leaders.findByIdAndUpdate(
			req.params.leaderId,
			{
				$set: req.body,
			},
			{ new: true }
		)
			.then(
				(leader) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(leader);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Leaders.findByIdAndRemove(req.params.leaderId)
			.then(
				(lead) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(lead);
				},
				(err) => next(err)
			)
			.catch((err) => next(err));
	});

module.exports = leaderRouter;
