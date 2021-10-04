//     "price": "19.99",
//     "description": "Featuring . . .",
//     "featured": false
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema(
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
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Promotions", promotionSchema);
