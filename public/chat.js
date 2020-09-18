$( function()
{ 
    var socket = io.connect("http://localhost:3000");
    var ready = false;

    $('#submit').submit(function(e) 
    {
		e.preventDefault();
		$("#nick").fadeOut()
		$("#chat").fadeIn()
		let name = $("#nickname").val();
		let time = new Date();
		$("#name").html(name);
		$("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

		ready = true;
		socket.emit("join", name);

	});

    $("#textarea").keypress(function(e)
    {
        if(e.which == 13) 
        {
        	var text = $("#textarea").val();
        	$("#textarea").val('');
        	var time = new Date();
                    $(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() 
                    + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() 
                    + '</time></div></li>')
					
					socket.emit("send", text)
					// automatically scroll down
					// document.getElementById('bottom').scrollIntoView()
        }
    });

    socket.on('update', msg =>
    {
        if (ready) 
        {
    		$('.chat').append('<li class="info">' + msg + '</li>')
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

})

// socket = io()

// uEl = document.getElementById('nickname') //pega o elemento usuário no DOM
// mEl = document.getElementById('textarea') //pega o elemento de envio de mensagens no DOM
// mensagens = []

// $("#textarea").keypress(function(e)
// {
//     if(e.which == 13) 
//     {
//         var text = $("#textarea").val()
//         $("#textarea").val('')
//         var time = new Date()
//         $(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
        
//         socket.emit("send", text);
//         // automatically scroll down
//         document.getElementById('bottom').scrollIntoView();
//     }
// })

// socket.on('chat', function(client, msg) 
// {    
//     var time = new Date();
//     $(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>')

//     console.log('Resposta do servidor: ', client + msg)
// })


// $('#textarea').on('keyup', (ev) => //ev significa evento
// {
//     if(ev.keyCode === 13)
//     {
//         socket.emit('new message', { usuario: uEl.value = 'uFixo', mensagem: mEl.value })          
//         mEl.value = ''

//         socket.on('new message',  data =>
//         {
//             mensagens.push(data)  
//             console.log('Dados enviados pelo servidor: ', data)
//         })

//         console.log('Socket.on não está funcionando')
//     }    
// })