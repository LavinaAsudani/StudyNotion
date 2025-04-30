const express=require("express")
const app=express()


require("dotenv").config()

const userRoute=require("./routes/User")
const courseRoute=require("./routes/Course")
const paymentRoute=require("./routes/Payments")
const profileRoute=require("./routes/Profile")
const contactRoute = require("./routes/Contact")

const database=require("./config/database")
const cookieParser = require("cookie-parser")
const cors=require("cors")
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload")


const PORT=process.env.PORT || 4000

//database connect
database.connect()

//middlewares
app.use(express.json())

app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
}));

   

//cloudinary connection
cloudinaryConnect()

//routes(mounting)

app.use("/api/v1/auth", userRoute)
app.use("/api/v1/profile", profileRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/reach", contactRoute)

//default route
app.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:"Your server is up and Running...."
    })
})

//activate server
app.listen(PORT,()=>{
    console.log(`App is running at PORT: ${PORT}`)
})




