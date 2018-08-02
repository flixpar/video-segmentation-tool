///////////////////////////////
/////////// Setup /////////////
///////////////////////////////

var vid = document.getElementById("video");
let player = new Plyr("#video");

console.log(vid_id);

///////////////////////////////
////////// Sockets ////////////
///////////////////////////////

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	socket.emit("get_frames", vid_id);
});
