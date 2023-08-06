const { exec } = require('child_process');


   async function compressPdf (entrada, saida) {
   
  
        const baseURL = "D:/hackton/HackatonAlfa/backend/uploads/"
  
      command= `gswin32 -sDEVICE=pdfwrite  -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${baseURL+"teste4.pdf"}" ${baseURL+entrada}`
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Erro ao executar o comando:', error);
          return;
        }



        console.log('Resultado:', stdout);
      });
    //   const cmd = spawn('cmd');

    //   // Evento 'data' para capturar a saída do cmd
    //   cmd.stdout.on('data', (data) => {
    //     console.log(data.toString());
    //   });
      
    //   // Evento 'error' para lidar com erros
    //   cmd.on('error', (error) => {
    //     console.error('Erro ao abrir o prompt de comando:', error);
    //   });
      
    //   // Evento 'close' para lidar com o término do processo
    //   cmd.on('close', (code) => {
    //     console.log(`O processo foi encerrado com o código ${code}`);
    //   });
      
    //   // Envia um comando para o prompt de comando
    //   cmd.stdin.write(command+'\r\n'); // Substitua o comando aqui
    //   cmd.stdin.end();
    console.log('PDF comprimido com sucesso!');
}
   
module.exports = {compressPdf}
