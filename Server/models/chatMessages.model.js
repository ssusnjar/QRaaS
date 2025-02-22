import mongoose from "mongoose";
import User from "./users.model";
import restaurant from "./restaurants.model";

const chatMessagesSchema= mongoose.Schema({
    userId:{
        type:User.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:restaurant.Types.ObjectId,
        required:true
    },
    message: {
        type:String,
        default:"",
        required:true
    },
    response: {
        type:String,
        default:"",
        required:true
    }
      
},
{
    timestamps:true
})