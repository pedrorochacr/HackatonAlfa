
const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());




const port = process.env.PORT;

console.log('Connected to PlanetScale!')
connection.end()



app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});