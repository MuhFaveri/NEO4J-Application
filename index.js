const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
const path = require('path');
const cors = require('cors');

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

testConnection(); // Chama a função de teste de conexão

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Habilitar CORS para todas as rotas

// Servir o HTML 
app.use(express.static(path.join(__dirname)));

// Rota para cadastrar um ator
app.post('/atores', async (req, res) => {
    const { id, nome } = req.body;
    try {
        const idCheckResult = await session.run(
            'MATCH (a:Ator {id: $id}) RETURN a',
            { id }
        );

        if (idCheckResult.records.length > 0) {
            return res.status(400).send('ID do ator já cadastrado.');
        }

        const result = await session.run(
            'CREATE (a:Ator {id: $id, nome: $nome}) RETURN a',
            { id, nome }
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
    const { id, titulo } = req.body;
    try {
        const idCheckResult = await session.run(
            'MATCH (f:Filme {id: $id}) RETURN f',
            { id }
        );

        if (idCheckResult.records.length > 0) {
            return res.status(400).send('ID do filme já cadastrado.');
        }

        const result = await session.run(
            'CREATE (f:Filme {id: $id, titulo: $titulo}) RETURN f',
            { id, titulo }
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
    const { idAtor, idFilme } = req.body;
    try {
        const result = await session.run(
            'MATCH (a:Ator {id: $idAtor}), (f:Filme {id: $idFilme}) ' +
            'CREATE (a)-[:ATUOU_EM]->(f) RETURN a, f',
            { idAtor, idFilme }
        );
        res.status(201).send('Relacionamento criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar relacionamento');
    }
});

// Rota para atualizar um ator
app.put('/atores/:id', async (req, res) => {
    const { id } = req.params;
    const { novoNome } = req.body;
    try {
        const result = await session.run(
            'MATCH (a:Ator {id: $id}) SET a.nome = $novoNome RETURN a',
            { id, novoNome }
        );
        const ator = result.records[0].get(0);
        res.status(200).send(ator.properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar ator');
    }
});

// Rota para atualizar um filme
app.put('/filmes/:id', async (req, res) => {
    const { id } = req.params;
    const { novoTitulo } = req.body;
    try {
        const result = await session.run(
            'MATCH (f:Filme {id: $id}) SET f.titulo = $novoTitulo RETURN f',
            { id, novoTitulo }
        );
        const filme = result.records[0].get(0);
        res.status(200).send(filme.properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar filme');
    }
});

// Rota para remover um ator
app.delete('/atores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await session.run(
            'MATCH (a:Ator {id: $id}) DETACH DELETE a',
            { id }
        );
        res.status(200).send('Ator removido com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao remover ator');
    }
});

// Rota para remover um filme
app.delete('/filmes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await session.run(
            'MATCH (f:Filme {id: $id}) DETACH DELETE f',
            { id }
        );
        res.status(200).send('Filme removido com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao remover filme');
    }
});

// Rota para buscar todos os atores, filmes e relacionamentos
app.get('/dados', async (req, res) => {
    try {
        const result = await session.run(
            'MATCH (a:Ator)-[r:ATUOU_EM]->(f:Filme) RETURN a, r, f'
        );

        const dados = result.records.map(record => ({
            ator: record.get('a').properties,
            filme: record.get('f').properties,
            relacionamento: record.get('r').type
        }));

        res.status(200).send(dados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
