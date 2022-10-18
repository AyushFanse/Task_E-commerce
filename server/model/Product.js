const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//*---------------------------* Schema for User Data *---------------------------*//

const productSchema = new Schema({ 
    productId:{
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    productType:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    basePrice:{
        type : Number,
        required : true
    },
    discount:{
        type : Number
    },
    charges:[{
        gst:{
            type : Number
        },
        delivery:{
            type : Number
        }
    }],
    finalPrice:{
        type : Number
    }
}, {timestamps: true})

//*---------------------------* Exporting Part *---------------------------*//

const Product = mongoose.model('Product' ,productSchema ,'Products' );
module.exports = Product;