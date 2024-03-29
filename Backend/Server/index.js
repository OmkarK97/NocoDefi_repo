const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const tokenRouter = require('./routes/token');

app.use(bodyParser.json());

// Use cors middleware to enable CORS for all routes
app.use(cors());

app.use("/erc20", tokenRouter);

app.listen(3000, () => {
    console.log("listening on port 3000");
});
