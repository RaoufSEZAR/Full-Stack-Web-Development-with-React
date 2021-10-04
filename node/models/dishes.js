const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const dishSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: "",
		},
		price: {
			type: Currency,
			required: true,
			min: 0,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Dishes", dishSchema);
