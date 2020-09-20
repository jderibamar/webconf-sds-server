var conn = new RTCMultiConnection()

$(function()
{
    conn.open(roomId.value)    
})

// this line is VERY_important
conn.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

// all below lines are optional; however recommended.

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
    video = event.mediaElement    

    if(event.type === 'local')
        lVideo.appendChild(video)               
    
    if(event.type === 'remote')
    {   
        // rVideos.appendChild(video)     
        ++numVideos
        if(numVideos == 1)
        {
            divVideo1 = document.createElement('div')
            divVideo1.setAttribute('id', 'video1')
            divVideo1.appendChild(video)
            rVideos.appendChild(divVideo1)

        }

        if(numVideos == 2)
        {
            divVideo2 = document.createElement('div')
            divVideo2.setAttribute('id', 'video2')            
            divVideo2.appendChild(video)
            rVideos.appendChild(divVideo2)

            divVideo2.style.setProperty('left', '76.5%')
            divVideo2.style.setProperty('top', '49%')

        }
        console.log('Total de cams: ', numVideos)       
    }    
        
}

roomId = document.getElementById('txt-roomid')

roomId.value = conn.token()        

var predefinedRoomId = 'YOUR_Name'

// document.getElementById('btn-criar').onclick = function()
// {        
//     this.disabled = true
//     conn.open(roomId.value)
// };

document.getElementById('btn-entrar').onclick = function() 
{
    this.disabled = true;
    conn.join( roomId.value )        
}


$('#img-cam').on('click', () =>
{
    firstLocalCameraStream = conn.streamEvents.selectFirst(
    {
        local: true,
        isVideo: true
    }).stream   

    // firstStreamEvent = conn.streamEvents.selectFirst({ local: true })
    
    // firstStreamEvent.stream.getVideoTracks().forEach(function(track) { track.stop() })
    // alert('Você desligou sua cam')
})

function updateLayout() 
{
    // update CSS grid based on number of diplayed videos
    var rowHeight = '98vh'
    var colWidth = '98vw'
    
    // var numVideos = Object.keys(peerConnections).length + 1; // add one to include local video
    
    if (numVideos > 1 && numVideos <= 4) 
    { // 2x2 grid
        rowHeight = '48vh';
        colWidth = '48vw'

        console.log('Número de vídeos é maior que 1')
    }
    else if (numVideos > 4) 
    { // 3x3 grid
        rowHeight = '32vh';
        colWidth = '32vw';
    }    

    document.documentElement.style.setProperty(`--rowHeight`, rowHeight)
    document.documentElement.style.setProperty(`--colWidth`, colWidth)

    console.log('Função de atualizar Layout funfando')
}
    
    // $.getScript("https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
//  $.getScript("https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
