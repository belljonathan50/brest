const express     = require('express');
var timesyncServer = require('timesync/server');
const app         = express();
const fs = require('fs');
const editJsonFile = require("edit-json-file");
const Max = require('max-api');



const router = express.Router();
const path = require('path');
const expressWs   = require('express-ws')(app);
const morgan      = require('morgan');
const compression = require('compression');
const serveStatic = require('serve-static');
const basicAuth   = require('basic-auth-connect');
const user = process.env.USER;
const pass = process.env.PASS;

let connects = [];
let file = editJsonFile(`${__dirname}/public/libs/DistributedState/state.json`);


app.set('port', process.env.PORT || 3000);

if (user && pass) {
  app.use(basicAuth(user, pass));
}


app.use(morgan('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

var publicPath = path.join(__dirname, 'public');


router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});



app.get('/c', function (req, res) {
  res.sendfile(publicPath + '/c.html');
});

app.get('/s', function (req, res) {
  res.sendfile(publicPath + '/s.html');
});

app.get('/a', function (req, res) {
  res.sendfile(publicPath + '/a.html');
});

app.get('/t', function (req, res) {
  res.sendfile(publicPath + '/t.html');
});

app.get('/b', function (req, res) {
  res.sendfile(publicPath + '/b.html');
});


app.get('/conductor', function (req, res) {
  res.sendfile(publicPath + '/conductor.html');
});


// app.use('/static', express.static(path.join(__dirname, 'public')))


Max.addHandler("bang", () => {
  file.set("seek", 12);
	Max.post("Who you think you bangin'?"+ file.get());
});


Max.addHandler("zouzou", () => {

	Max.post("received a zouzou mess");
});

Max.addHandler('seek', (dir) => {
  Max.post(`received seek ${dir}`);
  file.set("seek", dir);
  Max.post(file.get());
});

Max.addHandler('isPlaying', (dir) => {
  Max.post(`received isplaying ${dir}`);
  file.set("isPlaying", dir);
  Max.post(file.get());
});

Max.addHandler('rate', (dir) => {
  Max.post(`received rate ${dir}`);
  file.set("rate", dir);
  Max.post(file.get());
});

Max.addHandler('tune', (dir) => {
  Max.post(`received tune ${dir}`);
  file.set("tune", dir);
  Max.post(file.get());
});

















app.ws('/', (ws, req) => {
  connects.push(ws);

  ws.on('message', message => {
    console.log("hi");

    // console.log('message received serverside : '+ message);

    var words = message.split(' ');
    var first = words[0];
    var second = words[1];
    // console.log('first : '+first);
    // console.log('second : '+second + ' typeof : ' + typeof second);
    // var seekValue = parseInt(words[1]);
    // var vid = document.getElementById('vid');
    



switch(first) {
  case "stop":
    console.log("totoooo");
    file.set("isPlaying", "false");
    file.set("seek", 0);
    console.log(file.get());
    break;

  case "start":
    file.set("isPlaying", "true");
    break;

  case "pause":
  file.set("isPlaying", "false");
  break;

  case "seek":
    file.set("seek", second);
    console.log(file.get());
    Max.post("gogogogogogogoggo");
    Max.post(file.get());
    break;

  case "rate":
    file.set("rate", second);
    break;

  case "lag":
    file.set("lag", second);
    break;

  case "tune":
    file.set("tune", second);
    console.log("changed tune to "+ second)
    break;

  default:
    console.log("just a sync");
    console.log("what's triggering? " + second);
    console.log(file.get());
    // code block
} 
    connects.forEach(socket => {
      
      socket.send(message + ' '+  JSON.stringify(file));
      // socket.send(file);
    
      // socket.send(file);
    });



  });
  
  ws.on('close', () => {
    connects = connects.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });






	// Handle the Max interactions here...






});




app.use("/ws-stuff", router);

app.use('/timesync', timesyncServer.requestHandler);

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'));
});


