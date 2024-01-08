const mongoose=require("mongoose")

const salesSchema=new mongoose.Schema({
    idVoiture:String,
    idClient:String,
    idVendeur:String,                    
})
const salesModel=new mongoose.model("sales", salesSchema)
module.exports=salesModel
