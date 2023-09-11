const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function (req, res) {
    res.status(201).send('Agora Token generator');
});

app.use("/api", require("./api/generate"));


// Start the server
app.listen(5000, () => {
    console.log("Server is running on port: 5000");
});
