const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
const path = require('path');
const cors = require('cors');  // Importar o pacote cors

// Configurações do Neo4j
const uri = 'neo4j://localhost';
const user = 'neo4j';
const password = 'mw91391398';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session(); 

// Teste de conexão ao banco de dados
async function testConnection() {
    try {
        await driver.verifyConnectivity();
        console.log('Conexão com o banco de dados Neo4j foi bem-sucedida');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados Neo4j:', error);
    }
}

testConnection();  // Chama a função de teste de conexão

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Habilitar CORS para todas as rotas

// Servir o HTML 
app.use(express.static(path.join(__dirname)));

// Rota para cadastrar um ator
app.post('/atores', async (req, res) => {
    const { nome } = req.body;
    try {
        const result = await session.run(
            'CREATE (a:Ator {nome: $nome}) RETURN a',
            { nome }
        );
        const ator = result.records[0].get(0);
        res.status(201).send(ator.properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar ator');
    }
});

// Rota para cadastrar um filme
app.post('/filmes', async (req, res) => {
    const { titulo } = req.body;
    try {
        const result = await session.run(
            'CREATE (f:Filme {titulo: $titulo}) RETURN f',
            { titulo }
        );
        const filme = result.records[0].get(0);
        res.status(201).send(filme.properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar filme');
    }
});

// Rota para relacionar um ator a um filme
app.post('/relacionar', async (req, res) => {
    const { nomeAtor, tituloFilme } = req.body;
    try {
        const result = await session.run(
            'MATCH (a:Ator {nome: $nomeAtor}), (f:Filme {titulo: $tituloFilme}) ' +
            'CREATE (a)-[:ATUOU_EM]->(f) RETURN a, f',
            { nomeAtor, tituloFilme }
        );
        res.status(201).send('Relacionamento criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar relacionamento');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
 