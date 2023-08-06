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
<<<<<<< HEAD
const equipmentRoutes = require('./routes/equipmentRoutes');
const fileRoutes = require('./routes/fileRoutes');
=======

const cadastrarAreaOuEquipamentoRoutes = require('./routes/cadastrarAreaOuEquipamentoRoutes');
>>>>>>> f1e0bad991be6fb2138bc8949b6d66a133e5649d

app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
<<<<<<< HEAD
app.use('/equipment', equipmentRoutes);
app.use('/file', fileRoutes);
=======

app.use('/cadastrarAreaOuEquipamento', cadastrarAreaOuEquipamentoRoutes);
>>>>>>> f1e0bad991be6fb2138bc8949b6d66a133e5649d

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

