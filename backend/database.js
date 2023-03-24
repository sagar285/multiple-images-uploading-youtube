const mongoose =require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/multipleimg").then(()=>{
    console.log("onnection succesfull");
}).catch((e)=>{
    console.log(e);
})

const Schema = new mongoose.Schema({

name:{
    type:String
},
img:{
    type:Array
}

})

const Userimg = mongoose.model("Userimg",Schema);

module.exports =Userimg;