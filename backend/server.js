const mongoose = require("mongoose")
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB).then(con => { console.log("DB connection successfull")})


const port = 3000;


app.listen(port, () => {
    console.log("app running on port", port)
})

