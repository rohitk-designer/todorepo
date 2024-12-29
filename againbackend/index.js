const express = require("express")
require ("./db/config")
const works = require("./db/todo")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register",async(req,res)=>{
    try {
        let work = new works(req.body)
    let result = await work.save();
    res.send(result)
    } catch (error) {
        console.log("something error")
        res.send(error)
    }
    
})

app.get("/getdata",async(req,res)=>{
    let result = await works.find()
    
    res.send(result)
})
app.get("/getone/:id",async(req,res)=>{
    let result = await works.findOne({_id:req.params.id}) 
    res.send(result)
})

app.put("/update/:id",async(req,res)=>{
    let result = await works.updateOne(
        {_id : req.params.id},
        {$set :req.body }
    )
    res.send(result)
})

app.delete("/deletedata/:id",async(req,res)=>{
        let result = await works.deleteOne({_id:req.params.id})
        res.send(result)
})


app.listen(5000,()=>{
    console.log("server is running ")
})