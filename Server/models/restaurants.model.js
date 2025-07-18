import mongoose from "mongoose";
import User from "./users.model.js";

const restaurantSchema = mongoose.Schema({
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name: {
        type:String,
        required:true,
        trim:true
    },
    type: {
        type:String,
        enum: ['caffee bar', 'restaurant', 'pizzeria'],
        default:"caffee bar"
    },
    location: {
        type:String,
    }

},
{
    timestamps:true
})

const restaurant= mongoose.model("Restaurant", restaurantSchema);

export default restaurant;