const express = require('express');
const router = express.Router();

router.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  console.log('Buscando o arquivo ' + filename + ' no servidor.');
  res.sendFile(filename, { root: './uploads' });
});

module.exports = router;
