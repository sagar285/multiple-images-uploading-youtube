const express =require("express")
const app =express()
const Userimg = require("./database")
const multer =require("multer")
const cors =require("cors")

app.use(cors())
app.use(express.json())
app.use(express.static("public"))


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,"public/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({
    storage:storage
})

app.post("/",upload.array("img",12),async(req,res)=>{
    const {name} =req.body;
    const files =req.files;
    try {

        const newuser = new Userimg({name,img:files})
        const usersave = await newuser.save();
        res.send(usersave);
        
    } catch (error) {
        console.log(error);
    }
})

app.get("/",async(req,res)=>{
    let userdetail = await Userimg.find({})
    if(userdetail){
        res.status(200).send(userdetail);
    }
    else{
        res.status(500).send("error");

    }
})






app.listen(3000,()=>{
    console.log("server running on port 3000");
})