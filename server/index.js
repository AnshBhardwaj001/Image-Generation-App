import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js' 
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()  //pull environment variables from the dotenv file

const app = express()    

//app middlewares
app.use(cors())
app.use(express.json({limit: '50mb'}))

//creating api endpoints to hook on to from frontend
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle',dalleRoutes)

app.get('/' , async (req, res) => {
res.send("Hello from Dalle")
})

const startServer = async () => {
    try{
         connectDB(process.env.MONGODB_URI); 
            
        app.listen(8080 , () => {
            console.log("Server is running on port: http://localhost:8080")
        })
    }catch(error){        
        console.log(error)         
    }   

    
} 

startServer();