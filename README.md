# NEO4J-Application

README - Aplicação de Cadastro de Atores e Filmes

Descrição
Esta aplicação permite o cadastro, atualização, remoção e relacionamento entre atores e filmes utilizando uma API Node.js com Express e um banco de dados Neo4j. A interface do usuário é fornecida por uma página HTML que interage com a API.

Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js (versão 12 ou superior)
Neo4j (versão 4 ou superior)
Configuração do Neo4j
Instale e inicie o Neo4j:
Baixe e instale o Neo4j Community Edition a partir do site oficial: Neo4j Download
Inicie o servidor Neo4j e configure as credenciais de acesso (usuário e senha).
Configuração de Credenciais:
Certifique-se de que o banco de dados está rodando na localhost com o usuário neo4j e senha mw91391398 ou altere o código da aplicação para corresponder às suas credenciais.

Configuração do Projeto
Clonando o Repositório
Clone este repositório para a sua máquina local usando o comando:

sh
git clone <URL-do-repositório>
cd <nome-do-repositório>
Instalando Dependências
Instale as dependências necessárias com o npm:

sh
npm install
Executando a Aplicação
Iniciar o Servidor Node.js
Para iniciar o servidor, execute o seguinte comando no diretório raiz do projeto:

sh
node app.js
O servidor será iniciado na porta 3000. Você verá uma mensagem como:

Servidor rodando na porta 3000
Conexão com o banco de dados Neo4j foi bem-sucedida
Acessando a Interface de Usuário
Abra seu navegador e acesse:

http://localhost:3000
Endpoints da API
1. Cadastrar Ator
URL: /atores
Método: POST
Dados da Requisição:

{
  "id": "ID do Ator",
  "nome": "Nome do Ator"
}
Resposta de Sucesso: 201 Created
Resposta de Erro: 400 Bad Request (se o ID já existir), 500 Internal Server Error
2. Cadastrar Filme
URL: /filmes
Método: POST
Dados da Requisição:

{
  "id": "ID do Filme",
  "titulo": "Título do Filme"
}
Resposta de Sucesso: 201 Created
Resposta de Erro: 400 Bad Request (se o ID já existir), 500 Internal Server Error
3. Relacionar Ator a Filme
URL: /relacionar
Método: POST
Dados da Requisição:

{
  "idAtor": "ID do Ator",
  "idFilme": "ID do Filme"
}
Resposta de Sucesso: 201 Created
Resposta de Erro: 500 Internal Server Error
4. Atualizar Ator
URL: /atores/:id
Método: PUT
Dados da Requisição:

{
  "novoNome": "Novo Nome do Ator"
}
Resposta de Sucesso: 200 OK
Resposta de Erro: 500 Internal Server Error
5. Atualizar Filme
URL: /filmes/:id
Método: PUT
Dados da Requisição:

{
  "novoTitulo": "Novo Título do Filme"
}
Resposta de Sucesso: 200 OK
Resposta de Erro: 500 Internal Server Error
6. Remover Ator
URL: /atores/:id
Método: DELETE
Resposta de Sucesso: 200 OK
Resposta de Erro: 500 Internal Server Error
7. Remover Filme
URL: /filmes/:id
Método: DELETE
Resposta de Sucesso: 200 OK
Resposta de Erro: 500 Internal Server Error
8. Buscar Dados
URL: /dados
Método: GET
Resposta de Sucesso: 200 OK (retorna uma lista de atores, filmes e relacionamentos)
Resposta de Erro: 500 Internal Server Error
Funcionalidades da Interface
1. Cadastro de Ator
Preencha os campos "ID do Ator" e "Nome do Ator" e clique em "Cadastrar Ator".

2. Cadastro de Filme
Preencha os campos "ID do Filme" e "Título do Filme" e clique em "Cadastrar Filme".

3. Relacionar Ator e Filme
Preencha os campos "ID do Ator" e "ID do Filme" e clique em "Relacionar Ator e Filme".

4. Atualizar Ator
Preencha os campos "ID do Ator a ser atualizado" e "Novo Nome do Ator" e clique em "Atualizar Ator".

5. Atualizar Filme
Preencha os campos "ID do Filme a ser atualizado" e "Novo Título do Filme" e clique em "Atualizar Filme".

6. Remover Ator
Preencha o campo "ID do Ator a ser removido" e clique em "Remover Ator".

7. Remover Filme
Preencha o campo "ID do Filme a ser removido" e clique em "Remover Filme".

8. Visualizar Dados Cadastrados
Os dados cadastrados, incluindo atores, filmes e relacionamentos, são exibidos na seção "Dados Cadastrados".

Rodando o Frontend

Para rodar o frontend da aplicação, siga estas etapas:

1. Certifique-se de que o servidor Node.js esteja em execução. Se não estiver, inicie o servidor executando o seguinte comando no diretório raiz do projeto:

sh
node app.js
2. Abra um navegador da web e acesse o seguinte URL:

http://localhost:3000

3. Após acessar a URL, você verá a interface de usuário para cadastro de atores e filmes.

4. Utilize os formulários na página para realizar as operações desejadas, como cadastrar atores e filmes, relacionar atores a filmes, atualizar informações e remover atores e filmes.

5. Os dados cadastrados serão exibidos na seção "Dados Cadastrados" logo abaixo dos formulários.

Observação: O frontend da aplicação utiliza JavaScript e jQuery para fazer requisições AJAX para a API do backend. Certifique-se de que seu navegador permita a execução de scripts para que a interface funcione corretamente.

Contribuição
Para contribuir com este projeto, siga os passos abaixo:

Faça um fork do projeto.
Crie uma nova branch (git checkout -b feature/nova-feature).
Faça commit das suas alterações (git commit -am 'Adiciona nova feature').
Faça push para a branch (git push origin feature/nova-feature).
Abra um pull request.
Aguarde a revisão do mantenedor do projeto.
Após a aprovação, suas alterações serão mescladas ao branch principal.

Agradecemos antecipadamente por sua contribuição!

Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para mais detalhes.

Contato
Se você tiver alguma dúvida ou sugestão sobre este projeto, sinta-se à vontade para entrar em contato através do email: murisax1@email.com.
