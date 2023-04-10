const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    uid: {String, required: true},
    products: [
        {productID: {
            type: String
        },
    quantity: {
        type: Number,
        default: 1,
    },
}
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema)