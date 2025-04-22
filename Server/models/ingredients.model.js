import mongoose from "mongoose";

const ingredientsSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true

    },
    unit: {
        type:Number,
        required: true
    }

},
{
    timeStamp:true
})