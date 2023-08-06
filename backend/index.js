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
const cadastrarAreaOuEquipamentoRoutes = require('./routes/cadastrarAreaOuEquipamentoRoutes');
const aprovacaoFeriasRoutes = require('./routes/aprovacaoFeriasRoutes');
const solicitacaoFeriasRoutes = require('./routes/solicitacaoFeriasRoutes');
const aprovacaoRecisaoRoutes = require('./routes/aprovacaoRecisaoRoutes');
const solicitacaoRecisaoRoutes = require('./routes/solicitacaoRecisaoRoutes');

app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/cadastrarAreaOuEquipamento', cadastrarAreaOuEquipamentoRoutes);
app.use('/aprovacaoFerias', aprovacaoFeriasRoutes);
app.use('/solicitacaoFerias', solicitacaoFeriasRoutes);
app.use('/aprovacaoRecisao', aprovacaoRecisaoRoutes);
app.use('/solicitacaoRecisao', solicitacaoRecisaoRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
