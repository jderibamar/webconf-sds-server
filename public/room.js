        
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

    vContainer = document.getElementById('videos-container')

    conn.onstream = function(event) 
    {
        // document.body.appendChild( event.mediaElement)
        video = event.mediaElement

        if(event.type === 'local')
            lVideo.appendChild(video)               
        
        if(event.type === 'remote')
            rVideos.appendChild(video)
            
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
    
        //     console.log('firstLocalCameraStream: ', firstLocalCameraStream)

        firstStreamEvent = conn.streamEvents.selectFirst({ local: true })
        
        firstStreamEvent.stream.getVideoTracks().forEach(function(track) { track.stop() })
        alert('Você desligou sua cam')
    })


    // $.getScript("https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
//  $.getScript("https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js", function() {
//     alert("Script loaded but not necessarily executed.");
//  });
