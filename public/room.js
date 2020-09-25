// socket = io.connect('https://webconf-sds-server.herokuapp.com/')
socket = io()

var conn = new RTCMultiConnection()
var uRest
var listNames = []

$(function()
{    
    conn.open(roomId.value)
    
    socket.on('desconectou', (client) =>
    {
        uRest = client
        console.log('Usuários restantes: ', uRest) //funcionando
    })
       
})

socket.on('novo_cliente', (nomeU, listaNomes) =>
{
    // totalU.push(client.id)
    listNames = listaNomes
    
    console.log(`Cliente: ${ nomeU } entrou`)
    console.log('Clientes ativos: ', listNames)

    uLogados = listaNomes
                    
    // if (ready) 
    // {                
    //     //    $('.chat').append('<li class="info">' + msg + '</li>')
    // }
})


// this line is VERY_important
conn.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

// all below lines are optional; however recommended.

conn.extra =
{
    // joinedAt: (new Date).toLocaleDateString() + ' at ' + (new Date).toLocaleTimeString(),
    username: prompt('Digite seu nome:'),
    
    // aviso: console.log('Nome informado!', username)

}


conn.session = { audio: true, video: true }

conn.sdpConstraints.mandatory = 
{
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
}

lVideo = document.getElementById('video-local')
rVideos = document.getElementById('videos-remotos')

numVideos = 0
conn.onstream = function(event) 
{
    // document.body.appendChild( event.mediaElement)    
    // video = event.mediaElement    

    if(event.type === 'local')
        lVideo.appendChild(event.mediaElement)
    
    if(event.type === 'remote')
    {   
        let nomeU = event.extra.username

        videosRender(event, nomeU)
        // delete event.mediaElement.id; // make sure that below DIV has unique ID in the DOM
	
        // var div = document.createElement('div')
        // div.id = event.streamid;
        // div.className = 'video-div';
        // div.appendChild(event.mediaElement); // appending VIDOE to DIV

        // var h2 = document.createElement('h2');
        // h2.innerHTML = event.extra.username;
        // div.appendChild(h2)            	    
        
        // rVideos.appendChild(div)
        // rVideos.appendChild(video)
        // div.style.backgroundColor = event.extra.divBGColor;                        
                                    
        console.log('Total de cams: ', numVideos)
    }            
}

conn.onstreamended = function(event) 
{
    var div = document.getElementById(event.streamid)
    if(div && div.parentNode) 
    {
        div.parentNode.removeChild( div ) // remove it from the DOM
    }
}

// conn.onstreamended = function(event) 
// {
//     var video = document.getElementById(event.streamid);
//     if (video && video.parentNode) 
//     {
        
//         video.parentNode.removeChild(video)   
        
//         delVideo.remove()
//         let u = document.getElementsByClassName('videoLabel')
   
//         u[0].remove() 
//     }
    
//     console.log('onstreamended do vídeo removido: ', video)
    
// }

roomId = document.getElementById('txt-roomid')

roomId.value = conn.token()        

// var predefinedRoomId = 'YOUR_Name'

// document.getElementById('btn-criar').onclick = function()
// {        
//     this.disabled = true
//     conn.open(roomId.value)
// };

$('#btn-entrar').on('click', () => 
{
    conn.join( roomId.value)    
    
    $('#btn-entrar').fadeOut()            
})


$('#img-cam').on('click', () =>
{
    // firstLocalCameraStream = conn.streamEvents.selectFirst(
    // {
    //     local: true,
    //     isVideo: true
    // }).stream   

    firstStreamEvent = conn.streamEvents.selectFirst({ local: true })
    
    firstStreamEvent.stream.getVideoTracks().forEach(function(track) { track.stop() })
    alert('Você desligou sua cam')
})


delVideo = ''
function videosRender(event, usuario)
{    
    ++numVideos
    
    delete event.mediaElement.id; // make sure that below DIV has unique ID in the DOM
	
    var div = document.createElement('div')
    div.id = event.streamid
    div.className = 'video-div';
    div.appendChild(event.mediaElement) // appending VIDOE to DIV

    var h2 = document.createElement('h2')
    h2.innerHTML = usuario
    div.appendChild(h2)            	    
    
    rVideos.appendChild(div)
    // if(numVideos == 1)
    // {
    //     divVideo1 = document.createElement('div')
    //     divVideo1.setAttribute('id', 'video1')
    //     divVideo1.appendChild(video)
    //     divVideo1.appendChild(document.createTextNode(usuario) )
    //     rVideos.appendChild(divVideo1)

    //     // divVideo1.appendChild(makeLabel(usuario) )       
        
    //     delVideo = divVideo1  
        
    //     console.log('Criado primeiro vídeo: ', delVideo)
    // }

    // if(numVideos == 2)
    // {
    //     divVideo2 = document.createElement('div')
    //     divVideo2.setAttribute('id', 'video2')            
    //     divVideo2.appendChild(video)
    //     divVideo2.appendChild(document.createTextNode(usuario) )
    //     rVideos.appendChild(divVideo2)

    //     // divVideo2.appendChild(makeLabel(usuario) )
        
    //     delVideo = divVideo2

    //     console.log('Criado primeiro vídeo: ', delVideo)
    //     // divVideo2.style.setProperty('left', '76.5%')
    //     // divVideo2.style.setProperty('top', '49%')        
    // }

    // if(numVideos == 3)
    // {
    //     divVideo3 = document.createElement('div')
    //     divVideo3.setAttribute('id', 'video3')            
    //     divVideo3.appendChild(video)
    //     divVideo3.appendChild(document.createTextNode(usuario) )
    //     rVideos.appendChild(divVideo3)        
                  
    //     // divVideo3.appendChild(makeLabel(usuario) )

    //     delVideo = divVideo3
    //     upLayout()
    // }

    // if(numVideos == 4)
    // {
    //     divVideo4 = document.createElement('div')
    //     divVideo4.setAttribute('id', 'video4')
    //     divVideo4.appendChild(video)
    //     rVideos.appendChild(divVideo4)
                
    //     // divVideo4.appendChild(makeLabel(usuario) )

    //     delVideo = divVideo4
    //     upLayout()        
    // }

    // if(numVideos == 5)
    // {
    //     divVideo5 = document.createElement('div')
    //     divVideo5.setAttribute('id', 'video5')
    //     divVideo5.appendChild(video)
    //     rVideos.appendChild(divVideo5)
                
    //     delVideo = divVideo5
    //     // divVideo5.appendChild(makeLabel(usuario) )

    //     upLayout()
    // }

    // if(numVideos == 6)
    // {
    //     divVideo6 = document.createElement('div')
    //     divVideo6.setAttribute('id', 'video6')
    //     divVideo6.appendChild(video)
    //     rVideos.appendChild(divVideo6)
                
    //     // divVideo6.appendChild(makeLabel(usuario) )
        
    //     delVideo = divVideo6
    //     upLayout()        
    // }

    console.log('Var numVideos: ',  numVideos)    
}

function upLayout()
{            
    divVideo1.style.position = 'absolute'
    divVideo1.style.width = '26%'
    divVideo1.style.height = '46%'
    divVideo1.style.left = '13.4%'
    divVideo1.style.top = '24%'
    
    divVideo2.style.position = 'absolute'
    divVideo2.style.width = '26%'
    divVideo2.style.height = '46%'
    divVideo2.style.left = '49.5%'
    divVideo2.style.top = '24%'

    divVideo3.style.position = 'absolute'
    divVideo3.style.width = '26%'
    divVideo3.style.height = '46%'
    divVideo3.style.left = '73.5%'
    divVideo3.style.top = '1%'
    
    divVideo4.style.position = 'absolute'
    divVideo4.style.width = '26%'
    divVideo4.style.height = '46%'
    divVideo4.style.left = '0.4%'
    divVideo4.style.top = '53%'

    divVideo5.style.position = 'absolute'
    divVideo5.style.width = '26%'
    divVideo5.style.height = '46%'
    divVideo5.style.left = '36.4%'
    divVideo5.style.top = '53%'  
    
    divVideo6.style.position = 'absolute'
    divVideo6.style.width = '26%'
    divVideo6.style.height = '46%'
    divVideo6.style.left = '73.4%'
    divVideo6.style.top = '53%'
}

function makeLabel(label) 
{
    // let h2 = document.createElement('h2')
    // h2.innerHTML = event.extra.username

    var vidLabel = document.createElement('div')
    vidLabel.appendChild(document.createTextNode(label))
    vidLabel.setAttribute('class', 'videoLabel')
    return vidLabel
}

audioAtivo = true //var de controle para ativar ou desativar o microfone

$('#mic_des').on('click', () =>
{          
     let localStream = conn.attachStreams[0]

     if(audioAtivo)
     {        
        // localStream.getAudioTracks().forEach( (track) => { track.stop() })
        localStream.mute('audio')
        audioAtivo = false
        alert('Microfone desativado!')
     }
     else
     {                         
        localStream.unmute('audio')
        audioAtivo = true
        alert('Microfone ativado!')
     }     
    
    // conn.streamEvents.selectFirst().mute('audio')
    
})

    // $.getScript("https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
//  $.getScript("https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
