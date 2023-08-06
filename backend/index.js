const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

console.log('Connected to PlanetScale!');

const candidatoRoutes = require('./routes/candidatoRoutes');
const reportRoutes = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
