const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

const mongoDBURI = process.env.MONGODB_URI;

mongoose.connect(mongoDBURI).then(()=>{
  console.log("connection done")
}).catch((e)=>{
  console.log(e)
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    res.json(userDoc);
});

app.listen(3000,()=> console.log('server listening'));
//
