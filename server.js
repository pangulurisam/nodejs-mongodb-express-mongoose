const express= require( 'express')
const mongoose=require('mongoose')
const product=require('./models/productModel')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('Hello NODE API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello Blog My name is admin')
})

app.get('/product',async(req,res)=>
{
    try {
        const product=await product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({meassage:error.meassage})
    }
})

app.get('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({meassage:error.meassage})
    }
})

app.post('/product',async(req,res)=>{
    try {
        const product=await product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.meassage})
    }
})

//update a product
app.put('product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await product.findByIdAndUpdate(id,req.body);
        if(!product)
        {
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        const updatedproduct=await product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/product/:id',async(req,res)=>
{
    try {
        const {id}=req.params;
        const product= await product.findByIdAndDelete(id);
        if(!product)
        {
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        res.status(500).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://2000031949cse:296620@cluster0.bmvwwxf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connnected to MongoDB')
    app.listen(3000,()=>{
        console.log('Node API is running on port 3000')
    })
}).catch(()=>{
    console.log(error)
})