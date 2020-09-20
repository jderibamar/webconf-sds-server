$( function()
{ 
    // var socket = io.connect('https://dashboard.heroku.com/apps/webconf-sds-server')
    socket = io('http://localhost:3000')
    var ready = false
   
    $('#submit').on('submit', (e) =>
    {
		e.preventDefault()
		$('#nick').fadeOut()
		$('#chat').fadeIn()
		let name = $('#nickname').val()
		// let time = new Date()
		// $('#name').html(name)
		// $('#time').html('First login: ' + time.getHours() + ':' + time.getMinutes() )

		ready = true
        socket.emit('join', name)                
	})

    $('#textarea').on('keypress', (e) =>
    {
        if(e.which == 13) 
        {
        	var text = $("#textarea").val()
        	$('#textarea').val('')
        	var time = new Date()
            $('.chat').append('<li class="self"><div class="msg"><span>' + $("#nickname").val() 
            + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes()
            + '</time></div></li>')

            socket.emit('send', text)
            // automatically scroll down
            // document.getElementById('bottom').scrollIntoView()
        }
    })      

    socket.on('chat', (client, msg) =>
    {
        if (ready) 
        {
            var time = new Date()
            $('.chat').append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' 
            + msg + '</p><time>' + time.getHours() 
            + ':' + time.getMinutes() + '</time></div></li>')
    	}
    })    

    socket.on('novo_cliente', client =>
    {
        peerId = client.id
        
        console.log(`Cliente ID: ${ client.id } conectou`)
        
        if (ready) 
        {                
            //    $('.chat').append('<li class="info">' + msg + '</li>')
        }
    })

})


// socket = io()

// uEl = document.getElementById('nickname') //pega o elemento usuário no DOM
// mEl = document.getElementById('textarea') //pega o elemento de envio de mensagens no DOM
// mensagens = []


// socket.on('chat', function(client, msg) 
// {    
//     var time = new Date();
//     $(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>')

//     console.log('Resposta do servidor: ', client + msg)
// })
