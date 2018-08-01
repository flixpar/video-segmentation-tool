///////////////////////////////
/////////// Setup /////////////
///////////////////////////////

var vid = document.getElementById("video");

var currentFrame = 0;
var frameList = [];

let vid_id = 1;

///////////////////////////////
////////// Sockets ////////////
///////////////////////////////

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	socket.emit("get_frames", vid_id);
});

///////////////////////////////
///////// Get Frames //////////
///////////////////////////////

socket.on('recieve_frames', function(data) {
	frameList = data;
	initVid();
});

function initVid() {
	currentFrame = 0;
	vid.src = frameList[0];
}

///////////////////////////////
///////// Play/Pause //////////
///////////////////////////////

var globalID;

$("#start").on("click", function() {
	globalID = requestAnimationFrame(updateFrame);
});

$("#stop").on("click", function() {
	cancelAnimationFrame(globalID);
});

///////////////////////////////
//////// Update Frame /////////
///////////////////////////////

function updateFrame() {
	vid.src = nextFrame();
	globalID = requestAnimationFrame(updateFrame);
}

function nextFrame(skip_frames=1) {
	currentFrame = ((currentFrame + skip_frames) < frameList.length) ? (currentFrame + skip_frames) : frameList.length ;
	path = frameList[currentFrame];
	return path
}
