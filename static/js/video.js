///////////////////////////////
/////////// Setup /////////////
///////////////////////////////

var vid = document.getElementById("video");
let player = new Plyr("#video");

var speed = 1.0;

console.log(vid_id);

///////////////////////////////
////////// Sockets ////////////
///////////////////////////////

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	socket.emit("get_frames", vid_id);
});

///////////////////////////////
/////// Act Selection /////////
///////////////////////////////

var prevActButton = document.createElement("null");

function changeAct(e) {
	let target = e.target;
	let targetID = target.id;
	let actNum = e.target.id[3];

	target.classList.add("act-button-focused");
	prevActButton.classList.remove("act-button-focused");

	prevActButton = target;
}

let b0 = document.getElementById("act0-button");
let b1 = document.getElementById("act1-button");
let b2 = document.getElementById("act2-button");
let b3 = document.getElementById("act3-button");
let b4 = document.getElementById("act4-button");
let b5 = document.getElementById("act5-button");
let b6 = document.getElementById("act6-button");
let b7 = document.getElementById("act7-button");
let b8 = document.getElementById("act8-button");
let b9 = document.getElementById("act9-button");

b0.addEventListener("click", changeAct);
b1.addEventListener("click", changeAct);
b2.addEventListener("click", changeAct);
b3.addEventListener("click", changeAct);
b4.addEventListener("click", changeAct);
b5.addEventListener("click", changeAct);
b6.addEventListener("click", changeAct);
b7.addEventListener("click", changeAct);
b8.addEventListener("click", changeAct);
b9.addEventListener("click", changeAct);

///////////////////////////////
/////////// Speed /////////////
///////////////////////////////

var slider = document.getElementById("speed-slider");
var speed_disp = document.getElementById("speed-disp");

slider.addEventListener("change", function() {
	speed = slider.value;
	speed_disp.innerHTML = "Speed: " + speed;
	video.playbackRate = speed;
});
