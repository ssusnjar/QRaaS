import mongoose from "mongoose";
import User from "./users.model.js";
import restaurant from "./restaurants.model.js";

const chatMessagesSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true
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

export default mongoose.model("ChatMessage", chatMessagesSchema);