import express from "express";
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';


const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/users", userRoute)

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

mongoose.connect('mongodb+srv://sanjasusnjar07:ojwKWUTDgp5pkgKV@cluster0.vy2ef7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected to database!");
}).catch(()=>{
    console.log("Connection failed");
})
