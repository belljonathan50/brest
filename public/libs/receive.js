(function() {
  var HOST = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(HOST);
  
  var form = document.querySelector('.form');


  
  ws.onmessage = function(msg) {
    var response = msg.data;
    var words = response.split(' ');
    var first = words[0];
    var seekValue = parseInt(words[1]);

    // console.log(msg);
    // console.log("response "+ response);
    // console.log("words "+ words);
    // console.log("first "+ first);
    // console.log("seekValue "+ seekValue);
    // console.log(typeof seekValue);
    // console.log(typeof seekValue);
    // console.log(typeof seekValue);
    


    switch (first) {

      case "start":
        inscore.postMessageStrStr ("/ITL/scene", "event", "START0");
        break;

      case "pause":
        inscore.postMessageStrStr ("/ITL/scene", "event", "STOP0");
        break;

      case "seek":
        var message = inscore.newMessageM ("date");
        inscore.msgAddF (message, seekValue);
        inscore.postMessage ("/ITL/scene/cursor", message); 
        break;

      case "dummy":
        console.log("dummy");
        break;

      case "startX":
        inscore.postMessageStrStr ("/ITL/scene", "event", "STARTX");
        break;

      case "stop":
        inscore.postMessageStrStr ("/ITL/scene", "event", "REWIND");
        break;

      case  "hit":
        var NowClientSide = new Date(ts.now());
        var forsee = words[4];
        var difference = forsee - NowClientSide;
        console.log("NowClientSIde "+ NowClientSide.getTime());
        console.log("forsee "+ forsee);
        console.log("difference "+ difference);
        setTimeout( function() {inscore.postMessageStrStr("/ITL/scene", "event", "STARTX")}, difference)
        break;

        // case  "write":
        //   console.log("receive the write ");
       
        //   document.write("hello world")
        //   break;
          

    }





  }
}());
