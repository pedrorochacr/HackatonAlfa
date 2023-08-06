## Equipe webFET Hackthon Alfa Engenharia 2023

## Como excutar o sistema:
Rodar npm/yarn/pnpm install em todos os 3 diretórios

No diretório "backend": node index.js

No diretório "interno": npm/yarn/pnpm build depois npm/yarn/pnpm start

No diretório "externo": npm/yarn/pnpm build depois npm/yarn/pnpm start

git pull && npm instal em todos os diretórios (caso nao funcione o anterior) para versão de dev
No diretório "backend": node index.js
No diretório "interno": npm run dev
No diretório "externo": npm run dev 

Para a funcionalidade de OCR, é necessário ter python instalado no sistema e as seguintes bibliotecas:

pip install opencv-python 

pip install pytesseract

## Organização da equipe

O trabalho foi desenvolvido por Diogo Emanuel, Guilherme Augusto E Pedro Rocha

A organização do trabalho foi feita da seguinte maneira:

Guilherme:
  - Configurou o banco de dados, 
  - Front e BackEnd do cadastro de candidatos
  - Funcionalidade recolhimento de pdf's
  - Funcionalidade Estruturação e visualização documentos e telas via link para qr code
  - funcionalidade de responsividade 
  - melhoria funcionalidade de cadastro de area ou equipmento
  - autenticação e reconhecimecimento de usuario por cargo
  - reconhecimento de documentos anexados com porcentagem de probabilidade do documento ser válido
  
Pedro:
 - Configurou sistema externo 
 - Configurou BackEnd
 - Menu de navegação
 - Insert dos dados Funcionalidade Cadastro Report Segurança no banco
 - funcionalidade visualização de candidatos cadastrados no portal externo
 - funcionalidade admissão de candidatos
 - funcionalidade visualização de reports cadastrados no portal externo com visualização da localização no google maps
 - integração com whatsApp utilizando bot gratuito
 - compressão de arquivos em pdf

Diogo: 
 - Configurou o sistema interno
 - Scripts MySql para criação das tabelas
 - Funcionalidade Cadastro Report Segurança
 - Funcionalidade de pegar locazição durante o report
 - Recolhimento de fotos
 - script implementação de funções como opção de valor para cadastro do candidato
 - Funcionalidade de solicitação e aprovação de férias
 - Funcionalidade de solicitação e aprovação de recisão
 - funcionalidade de cadastro de area ou equipmento

## Esboço Banco de Dados

![image](https://github.com/pedrorochacr/HackatonAlfa/assets/93398906/990e56a7-432b-4150-a577-d05e75493fbf)

![image](https://github.com/pedrorochacr/HackatonAlfa/assets/93398906/9d2751b8-fc2c-4fb7-bc4c-8a1b35b366c4)

![image](https://github.com/pedrorochacr/HackatonAlfa/assets/93398906/40362023-c8f5-4ed7-b0e8-8829c19adba9)


Alguns sripts do banco
https://docs.google.com/document/d/1oMUPrzuiITjPvwmCW_Wml4IMvYgk_tdMjehU6uqNNZo/edit
