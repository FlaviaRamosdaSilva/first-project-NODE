
const express = require('express')

const port = 3000
const app = express()
app.use(express.json())  // avisar que vamos usar o body com Json


app.listen(port, () => {
    console.log (`🚀 Server Started on port ${port}`)
})

app.get('/users', (request, response) => {
    //const name = request.query.nome 
    //const age = request.query.age
    const {name, age } = request.body
    // é o mesmo que => const {name, age } = request.query = destructuring assignment
    return response.json({name, age})
    // return response.json({ name: name, age: age }) // é o mesmo que isso => return response.json({ name, age})
})

// query params => meusite.com/users?nome=rodolfo&age=28 //filtros
// Route params => BUSCAR DELETAR OU ATUALIZAR ALGO ESPECIFICO;

