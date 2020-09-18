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
var numUsers = 0
let totalU = []
let msgRec = [] //array de mensagens recebidas

io.on('connection', client =>
{  
    client.on('join', name =>
    {
    	console.log('Joined: ' + name)
        clients[client.id] = name;
        // client.emit('update', 'Você conectou no servidor!')
        client.broadcast.emit('update', name + ' has joined the server.')
    });

    client.on('send', msg =>
    {
    	console.log('Message: ' + msg);
        client.broadcast.emit('chat', clients[client.id], msg)
    })

    client.on('disconnect', () =>
    {
    	console.log('Disconnect')
        io.emit("update", clients[client.id] + ' has left the server.')
        delete clients[client.id]
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