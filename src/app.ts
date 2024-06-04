import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import backgroundRouter from './routes/backgroundWallpaperRoutes'
import desktopRouter from './routes/desktopIconRoutes'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

app.use(cors())

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log('Connected to MongoDB');  
}).catch((err) => {
    console.error('Failed to connect MongoDB', err)
})

app.use(express.json())
app.use('/background', backgroundRouter)
app.use('/desktop-icons', desktopRouter)


export default app
