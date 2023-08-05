
const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());




const port = process.env.PORT;
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()



app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});