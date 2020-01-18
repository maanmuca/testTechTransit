const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

//**********************************FILES FOR API*********************************************//
let apiRoutes = require("./server/routes/api-routes");
let config = require("./server/config/keys");

//**********************************ROUTES*********************************************//

const app = express();
const history = require('connect-history-api-fallback');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set("view engine", "html");
app.use(cors());
app.use("/api",apiRoutes);
app.use(history());
app.use(express.static(__dirname +'/server/public'));
app.get("/", (req, res) => res.sendFile(__dirname + '/server/public/index.html'));



const PORT  = process.env.PORT || 8080;

app.listen(PORT,()=>{
  console.log(`Server started at port ${PORT}`);
});

//**********************************CONNECTION DATABASE*********************************************//


  mongoose.connect(process.env.MONGO_DB_URL ||config.MONGO_DB_URL ,{ useNewUrlParser: true,dbName:process.env.MONGO_DB_NAME || config.MONGO_DB_NAME,useUnifiedTopology: true  } ,() => {
    console.log("connected to the database");
  });

mongoose.connection.on('error', err => {
  console.log(err);
});


