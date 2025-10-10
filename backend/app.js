import express from "express" 
import cors from 'cors'

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection

//api endpoints

app.get("/",(req,res)=>{
    console.log(`server started on http://localhost:${port}`)
})


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})