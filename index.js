

// Com Middleware:

const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json()) 

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params // precisamos da informação do ID que queremos atualizar primeiramente
    //ele vai pegar o ID lá na url do insomnia, que vai ta aparecendo no params;
    const index = users.findIndex(user => user.id === id)  //achar a posição onde está o ID dentro do array com
    //findIndex pra isso dizemos que queremos o ID que eu digitar na barra de url do insomnia do PUT
    if (index < 0){
        return response.status(404).json({error: "user not found"})
    } // aqui é pra dar a mensagem caso o ID esteja errado, pq no findIndex ele retorna -1 quand não acha algo
    request.userId = id
    request.UserIndex = index
    next()
}

app.get('/users', (request, response) => {
    return response.json(users) //retorna todos meus usuários
})

app.post('/users', (request, response) => {
    const { name, age} = request.body // pega o que eu coloquei no Body
    const user = { id:uuid.v4(), name, age } // cria um ID para os dados do body e armazena os 3 no USER
    users.push(user) // pega a variável USERS que tava com o array vazio e adiciona (push) o que eu criei na linha de cima

    return response.status(201).json(user) // retorna o usuário que criamos apenas e coloca o status lá de cima com 201
})

//você volta na aba GET do insomnia e clica SEND e ele vai trazer
//todos os usuarios criados, ou seja o array USERS

app.put('/users/:id', checkUserId, (request, response) => {
    const id = request.userId
    const { name, age} = request.body // pegar as informações novas no Insomnia no Body de JSON do PUT

    const updateUser = { id, name, age } //estou reformulando os dados do meu usuário, criando o usuário atualizado;
    // o ID que já existe, vamos pegar da verificação anterior (UserId), o novo name e novo age que vieram do body pela const name, age.
    const index = request.UserIndex // ele puxa do IF do checkUserId
    users[index] = updateUser //aqui ele vai procurar o array USERS e vai dizer que o index tal (posição)
    //deve ser  o que resultar do updateUser (substituindo os dados)
   
    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.UserIndex // ele puxa do IF do checkUserId pelo ID que colocamos na URL
   
    users.splice(index, 1) // aqui eu puxo a posição x do index e deleto só 1, ou seja, só ele

    return response.status(204).json() 
})


app.listen(port, () => {
    console.log (`🚀 Server Started on port ${port}`)
})
