const mongoose = require('mongoose');


const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}


mongoose.connect(process.env.DB_CONNECTION_STRING,connectionParams)
.then(()=>console.log("connected to mongoDb atlas"))
.catch(err => console.log(`Error in connecting to database ${err}`))










// module.exports = db;