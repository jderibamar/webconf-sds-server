$( function()
{ 
    // socket = io.connect('https://webconf-sds-server.herokuapp.com/')
    // socket = io()
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
        	// $('#textarea').val('')
        	var time = new Date()
            $('.chat').append(` <li> <div> <span> ${ $("#nickname").val() } </span> <time>  
            ${ time.getHours() }:${ time.getMinutes() } </time>  ${ text }  </div></li> `)

            socket.emit('send', text)
            // automatically scroll down
            // document.getElementById('bottom').scrollIntoView()
           
            $("#textarea").val('')
            scroll()
        }
    })      

    socket.on('chat', (client, msg) =>
    {
        if (ready) 
        {
            var time = new Date()
            $('.chat').append(`<li> <div> <span> ${ client } </span> <time> ${ time.getHours() }:${ time.getMinutes() } </time>
             ${ msg } </div> </li>`)
    	}
    })      

})

$('#textarea').attr('disabled', true)

$('#nickname').on('keyup', (e) =>
{
    if(e.keyCode == 13)
    {
        $('#textarea').attr('disabled', false)
        msgA = document.getElementById('textarea')
        msgA.style.setProperty('background-color', '#fff')
        msgA.focus()
    }        
})


//função que empurra a barra de rolagem para baixo com aumento de mensagens digitadas
function scroll()
{
    //scrollTop: quantidade de rolagem que o usuário fez
    //scrollHeight: tamanho total do contêiner

    let priVez = true //verificar se é a primeira vez que rola a barra de rolagem
    let scrollDiv = document.getElementById('chat')

    if(priVez)
    {
        scrollDiv.scrollTop = scrollDiv.scrollHeight
        priVez = false
    }
    else if(scrollDiv.scrollTop + scrollDiv.scrollHeight === scrollDiv.scrollHeight)
    {
      scrollDiv.scrollTop = scrollDiv.scrollHeight
    }        

    // let altPag = document.body.scrollHeight  -> pega a altura do container        
}



// uEl = document.getElementById('nickname') //pega o elemento usuário no DOM
// mEl = document.getElementById('textarea') //pega o elemento de envio de mensagens no DOM
// mensagens = []


// socket.on('chat', function(client, msg) 
// {    
//     var time = new Date();
//     $(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>')

//     console.log('Resposta do servidor: ', client + msg)
// })
