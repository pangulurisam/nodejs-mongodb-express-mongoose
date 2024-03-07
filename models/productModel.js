const mongoose=require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            requried:[true,"Please enter a product name"] 
        },
        quantity:{
            type: Number,
            requried: true,
            default:0
        },
        price:{
            type: Number,
            requried: true
        },
        image:{
            type: String,
            requried:false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports= Product;