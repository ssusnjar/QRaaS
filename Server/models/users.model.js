import mongoose from 'mongoose';

const UserSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email:{
        type:String,
        required:true,
        unique:true,
        trim:true
      },
      password:{
        type:String,
        required:true
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
// company name: ime.d.o.o, 
},
{
    timestamps:true
}
);

const User= mongoose.model("User", UserSchema);

export default User;






 
