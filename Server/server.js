import express from "express";
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
// import ollamaRoute from './routes/ollama.route.js'
import cors from "cors";
import cjeniciRoutes from './routes/cjenici.route.js'
import authRoute from './routes/auth.route.js'
import intentRoute from './routes/intent.route.js'
import restaurantRoute from './routes/restaurant.route.js'
import dotenv from "dotenv";

dotenv.config()

const PORT = 5000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/users", userRoute)

// app.use("/api/chat", ollamaRoute);
app.use("/api/chat", intentRoute);

app.use("/api/cjenici", cjeniciRoutes);

app.use("/api/auth", authRoute);

app.use("/api/restaurants", restaurantRoute);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

mongoose.connect('mongodb+srv://sanjasusnjar07:ojwKWUTDgp5pkgKV@cluster0.vy2ef7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected to database!");
}).catch(()=>{
    console.log("Connection failed");
})
