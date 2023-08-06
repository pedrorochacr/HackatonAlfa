const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

console.log('Connected to PlanetScale!');
//rotas para operações no banco de dados
const candidatoRoutes = require('./routes/candidatoRoutes');
const reportRoutes = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');
const aprovacaoFeriasRoutes = require('./routes/aprovacaoFeriasRoutes');
const solicitacaoFeriasRoutes = require('./routes/solicitacaoFeriasRoutes');
const aprovacaoRecisaoRoutes = require('./routes/aprovacaoRecisaoRoutes');
const solicitacaoRecisaoRoutes = require('./routes/solicitacaoRecisaoRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use('/candidato', candidatoRoutes);
app.use('/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/aprovacaoFerias', aprovacaoFeriasRoutes);
app.use('/solicitacaoFerias', solicitacaoFeriasRoutes);
app.use('/aprovacaoRecisao', aprovacaoRecisaoRoutes);
app.use('/solicitacaoRecisao', solicitacaoRecisaoRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

