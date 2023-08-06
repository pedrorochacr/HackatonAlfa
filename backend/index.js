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
const cadastrarAreaOuEquipamentoRoutes = require('./routes/cadastrarAreaOuEquipamentoRoutes');
const aprovacaoFeriasRoutes = require('./routes/aprovacaoFeriasRoutes');
const solicitacaoFeriasRoutes = require('./routes/solicitacaoFeriasRoutes');
const aprovacaoRecisaoRoutes = require('./routes/aprovacaoRecisaoRoutes');
const solicitacaoRecisaoRoutes = require('./routes/solicitacaoRecisaoRoutes');
=======
const equipmentRoutes = require('./routes/equipmentRoutes');
const fileRoutes = require('./routes/fileRoutes');
>>>>>>> 62a3bea9ce4720d66c02acc6d15810fe7175d172

app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
<<<<<<< HEAD
app.use('/cadastrarAreaOuEquipamento', cadastrarAreaOuEquipamentoRoutes);
app.use('/aprovacaoFerias', aprovacaoFeriasRoutes);
app.use('/solicitacaoFerias', solicitacaoFeriasRoutes);
app.use('/aprovacaoRecisao', aprovacaoRecisaoRoutes);
app.use('/solicitacaoRecisao', solicitacaoRecisaoRoutes);
=======
app.use('/equipment', equipmentRoutes);
app.use('/file', fileRoutes);
>>>>>>> 62a3bea9ce4720d66c02acc6d15810fe7175d172

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

