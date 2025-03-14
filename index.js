
//const users = require("./MOCK_DATA.json")
const fs = require("fs");
const e = require("express");

const { type } = require("os");
const { timeStamp } = require("console");
const app = express()
const PORT = 8000;

//connecting to the database
mongoose.connect("mongodb://127.0.0.1:27017/project-1-db")
.then(() => console.log("MONGOOSE CONNECTED"))
.catch((err) => console.log("MONGO ERROR", err))

//Middleware
app.use(express.urlencoded({extended:false}))






app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})