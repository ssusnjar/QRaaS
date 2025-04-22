import mongoose from "mongoose";
import restaurant from "./restaurants.model.js";
import ingredients from './ingredients.model.js'

const menuSchema= mongoose.Schema({
    restaurantID: {
        type:restaurant.Types.ObjectId,
        required:true
    },
    title: {
        type:String,
        required:true,
        default:''
    },
    items:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        category:{type:String, required:true},
        ingredients:{
            type:ingredients.type.ObjectId
        }
    }]
},
{
    timeStamp:true
})

const menu = mongoose.model("menu", menuSchema);
export default menu;
