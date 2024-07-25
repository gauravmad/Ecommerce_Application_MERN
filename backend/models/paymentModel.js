const mongoose =require("mongoose");

const payments =new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        required: true,
      },
    payment_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['Online', 'Cash on Delivery'],
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: function() {
            return this.payment_method === 'Online';
        }
    },
    amount: {
        type: Number,
        required: true
    }
})

const Payments =mongoose.model('Payments',payments);
module.exports=Payments; 