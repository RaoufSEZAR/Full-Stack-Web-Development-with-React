const express = require("express"),
	http = require("http");
const mongoose = require("mongoose");

const morgan = require("morgan");

const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const app = express();

app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});
const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);
connect.then(
	(db) => {
		console.log("Connected correctly to server");
	},
	(err) => {
		console.log(err);
	}
);
