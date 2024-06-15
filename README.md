<p align="center">
  <img src="SmartFarm-WebDataViz/App/public/Img/Banner SmartFarm.png"/>
</p>

# SmartFarm-AdquirindoLeituras--Sprint03-
Repositório da solução SmartFarm, que obtém as leituras do Arduino, e tem a sua lógica de Inserir no Banco de Dados.


Como funciona?

- Você deve utilizar "npm start" na solução para iniciar a gravação das leituras no banco.

- A solução inicia a partir das leituras dos sensores do Arduino

- O Arduino armazena essas leituras temporariamente em cache.

- As leituras são requisitadas pelo data-acquino.

- O Data-Acquino necessita do Node para executar corretamente.

- O Data-Acquino organiza as informações para serem armazenadas da maneira correta.

- Os dados são separados e enviados para o banco.
