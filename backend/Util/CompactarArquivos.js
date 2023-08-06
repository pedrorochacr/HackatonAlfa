const { exec } = require('child_process');


   async function compressPdf (entrada) {
  
        const baseURL = "D:/hackton/HackatonAlfa/backend/uploads/"
      //script GhostScript para executar no prompt de comando e compactar o arquivo
      command= `gswin32 -sDEVICE=pdfwrite  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${baseURL+"teste4.pdf"}" ${baseURL+entrada}`
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Erro ao executar o comando:', error);
          return;
        }


        console.log('Resultado:', stdout);
      });
    console.log('PDF comprimido com sucesso!');
}
   
module.exports = {compressPdf}
