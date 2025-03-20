require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false,limit: '50mb'}));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use(cors({
    origin: 'http://localhost:3000'
}));

connectDB();

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/ing", require("./routes/ing.routes"));
app.use("/api/cart", require("./routes/cart.routes"));

app.use('/imgs', express.static(__dirname + '/imgs'));