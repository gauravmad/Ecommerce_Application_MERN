const mongoose =require("mongoose");

const reviewsSchema =new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    rating:{
        type:Number,
        required:true,
    },
    description:{
        type:String ,
        required:true,
    }

})
const Reviews=mongoose.model("Reviews",reviewsSchema);
module.exports=Reviews;