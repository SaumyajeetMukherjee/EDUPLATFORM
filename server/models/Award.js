const mongoose=require('mongoose')
require('dotenv').config()
const validator=require('validator');
const Schema = mongoose.Schema;

const newsSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    subject:{
     type:Array,
     default:[],
     required:true
    },
    images:{
        type:Array,
        default:[]
    }
    

},{timestamps:true})


const News=mongoose.model('News',newsSchema)


module.exports={News}