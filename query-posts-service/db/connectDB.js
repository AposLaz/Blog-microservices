/**
 * Connect to mongoDB
 */
const mongoose=require('mongoose')
const {MONGO_CONNECT}=require('../config/index')

console.log(MONGO_CONNECT)
const mongoDB = `mongodb://${MONGO_CONNECT}/blog?authSource=admin`;
mongoose.set("strictQuery", false);

const connectMongoose = async ()=>{
    await mongoose.connect(mongoDB)
}

module.exports = {
    connectMongoose
}