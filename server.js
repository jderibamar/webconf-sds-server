const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const port = process.env.PORT || 3000

// const client = require('client.io-client')

server.listen(port, () => { console.log('Servidor de testes ativo na porta %d', port) })

// Routing
app.use(express.static(path.join(__dirname, 'public')) )
app.get('/room', (req, res) =>
{
    res.sendFile(__dirname + '/public/room.html')
})

app.use(cors())

// Chatroom
clients = {}
let nomeU = ''
totalU = []

io.on('connection', client =>
{  
    console.log(`Socket ID: ${ client.id } conectou`)
    totalU.push(client.id)
    console.log('Total de usuários conectados: ', totalU.length)

    client.on('join', name =>
    {        
        console.log(`${ name } entrou`)        
        client.broadcast.emit('novo_cliente', nomeU, totalU.length )

        clients[client.id] = name  
        nomeU = name          
                
        // client.emit('update', 'Você conectou no servidor!')
        // client.broadcast.emit('update', name, client.id + ' has joined the server.')
    })

    client.on('send', msg =>
    {
    	console.log(`${ clients[client.id] }: ${ msg }`);
        client.broadcast.emit('chat', clients[client.id], msg)
    })

    client.on('disconnect', () =>
    {
    	console.log(`Cliente ID: ${ client.id } desconectou`)
        // io.emit("update", clients[client.id] + ' has left the server.')
        delete clients[client.id]        

        totalU.splice(totalU.indexOf(client) ,1)
        console.log('Total de usuários: ', totalU.length)

        client.emit('desconectou', totalU.length)
    })
})

// io.on('connection', (client) => 
// {
//     totalU.push(client)
//     console.log('Nova conexão de ID: ', client.id)
//     console.log(`Total de usuários conectados: ${ totalU.length }`)    

//     client.on('send', msg =>
//     {
//     	console.log("Mensage recebida do cliente: " + msg);
//         client.broadcast.emit('chat', clients[client.id], msg)
//     })

//     // when the client emits 'new message', this listens and executes
//     // client.on('new message', (data) => 
//     // {
//     //     // we tell the client to execute 'new message'
//     //     msgRec.push(data) 
//     //     console.log('Mensagens no servidor de exemplo: ', msgRec)
//     //     client.broadcast.emit('new message', data)
//     // })

//     client.on('disconnect', data => 
//     {        
//         totalU.splice(totalU.indexOf(client), 1)
//         console.log(`client de ID: ${ client.id } desconectou `)
        
//         let qtdU = totalU.length //por causa da dupla conexão que realizo com o client
//         client.broadcast.emit('user-left', { numU: qtdU, idSoc: client.id })
//         console.log('Número de usuários conectados: ', qtdU )    
        
//         console.log(`Total de usuários conectados: ${ totalU.length }`)        
//     })
// })   