import express from "express" 
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import chatRouter from "./routes/chatRoute.js"
import historyRouter from "./routes/historyRoute.js"
// Load environment variables FIRST
dotenv.config();

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/user",userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/history", historyRouter)

app.get("/",(req,res)=>{
    res.send("Server is running successfully!");
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})