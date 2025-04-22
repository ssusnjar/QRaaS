import User from '../models/users.model.js';


const getUser= async(req, res)=>{
    try{
      const {id}=req.params;
      const user= await User.findById(id);
      res.status(200).json(user);
    }
    catch(err){
      res.status(500).json({message:err.message});
    }
}
const getUsers= async(req, res)=>{
    try{
      const users=await User.find({});
      res.status(200).json(users);
    }
    catch(err){
      res.status(500).json({message:err.message});
    }
}

const createUser= async(req, res)=>{
    try{
       const user = await User.create(req.body);
       res.status(200).json(user);
    }catch(error){
       res.status(500).json({message:error.message});
    }
}

const updateUser = async(req, res)=>{
    try{
      const {id}=req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
  
      if(!user){
        return res.status(404).json({message:"not found"});
      }
  
      const update= await User.findById(id);
      res.status(200).json(update);
    }
    catch(err){
      res.status(500).json({message:err.message})
    }
}

const deleteUser= async(req, res)=>{
    try{
      const {id}=req.params;
      const user = await User.findByIdAndDelete(id);
  
      if(!user){
        return res.status(404).json({message:"not found"});
      }
  
      res.status(200).json({message:"User deleted successfully"});
    }
    catch(err){
      res.status(500).json({message:err.message})
    }
 }

export default {getUser,getUsers,createUser,updateUser,deleteUser};