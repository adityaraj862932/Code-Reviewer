require('dotenv').config();
const app=require("./src/app.js");


app.listen(process.env.PORT,()=>{
    console.log("server running on 3000");
})