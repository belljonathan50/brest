(function() {
    var HOST = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(HOST);
    var form = document.querySelector('.form');
    window.temp = 60;
    window.lastDate = 0;

ws.onmessage = function(msg) {
    var response = msg.data;
    console.log("response "+response);
    var words = response.split(' ');
    var first = words[0];
    var second = parseFloat(words[1]);
    var deuxieme = words[1];
    var vid = document.getElementById('vid');
    

    switch (first) {
      
      case "PLAY":
        // setTimeout( function(){vid.play(); console.log("hurrayyyyy");},delay);

        // temp = 60;
        // var msg = inscore.newMessageM("tempo");
        // inscore.msgAddF(msg, temp);
        // inscore.postMessage("/ITL/scene/cursor", msg);
        console.log("tempo "+ window.temp);
        var msg = inscore.newMessageM("tempo");
        inscore.msgAddF(msg, window.temp);
        inscore.postMessage("/ITL/scene/cursor", msg);
        
        break;

      case "REWIND":
        // vid.pause();
        // vid.currentTime = zozo;
       
        var msg = inscore.newMessageM("tempo");
        inscore.msgAddI(msg, 0);
        inscore.postMessage("/ITL/scene/cursor", msg);
        console.log("stttooop ");

        var msg = inscore.newMessageM("date");
        inscore.msgAddF(msg, window.lastDate);
        inscore.postMessage("/ITL/scene/cursor", msg);
        break;

      case "PAUSE":
        // vid.pause();
        
        var msg = inscore.newMessageM("tempo");
        inscore.msgAddI(msg, 0);
        inscore.postMessage("/ITL/scene/cursor", msg);
        console.log("temp "+temp);
        break;

      case "vdate":
          console.log(second);
        // vid.currentTime = second*4;
        // zozo = second*4;
        window.lastDate = second;
        var msg = inscore.newMessageM("date");
        inscore.msgAddF(msg, second);
        inscore.postMessage("/ITL/scene/cursor", msg);
        console.log(msg);

        break;

      case "dummy":
        console.log("dummy");
        break;

      case "speed":
        // vid.playbackRate = second;
       window.temp = second * 60;
       console.log(window.temp);


        break;

      case "STOP":
        // vid.pause();
        // vid.currentTime = 0;
        temp = 0;
        var msg = inscore.newMessageM("tempo");
        inscore.msgAddF(msg, temp);
        inscore.postMessage("/ITL/scene/cursor", msg);
        console.log("temp "+temp);

        
        var msgt = inscore.newMessageM("date");
        inscore.msgAddF(msgt, 0);
        inscore.postMessage("/ITL/scene/cursor", msgt);
        console.log(msgt);
        break;

      case "tune":
          console.log(deuxieme);
          vid.src= "lib/vids/s/"+deuxieme+'.mp4';
          break;

      case  "hit":
        var NowClientSide = new Date(ts.now());
        var forsee = parseInt(words[4]);
        console.log("zob");
        console.log(NowClientSide.getTime());
        console.log(NowClientSide.value);
        console.log(typeof forsee);
        console.log(typeof tomate);
        console.log(typeof NowClientSide);
        var difference = (forsee + tomate) - NowClientSide.getTime();
        console.log("NowClientSIde "+ NowClientSide.getTime());
        console.log("forsee "+ forsee);
        console.log("difference "+ difference);
        setTimeout( function() { vid.play(); }, difference)
        break;
    }
  };

function refresh(){
    setInterval(function(){send("dummy;")},10000)
}
var client = true;
function send (msg) { ws.send (msg);}
}());


