///////////////////////////////
/////////// Setup /////////////
///////////////////////////////

var vid = document.getElementById("video");
let player = new Plyr("#video");

var display = document.getElementById("segm_display");

var anns = [];

var speed = 1.0;

var duration = null;
var gotAnns = false;

console.log(vid_id);

var title_disp = document.getElementById("title");
title_disp.innerHTML = "Video - " + vid_id.substr(4,2) + "/" + vid_id.substr(6,2) + "/" + vid_id.substr(0,4) + " " + vid_id.substr(9,2) + ":00";

///////////////////////////////
////////// Sockets ////////////
///////////////////////////////

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	queryAnns();
});

function writeAnns() {
	socket.emit("update_segm", vid_id, anns);
}
function queryAnns() {
	socket.emit("query_segm", vid_id);
}

socket.on('get_segm', function(data) {
	console.log(data);
	anns = data;
	gotAnns = true;
	initDisplay();
});

///////////////////////////////
//////// Annotations //////////
///////////////////////////////

function convertAnns() {
	while (display.firstChild) {
	    display.removeChild(display.firstChild);
	}

	anns = anns.sort(function(a,b){return a.start-b.start});

	for (var i=0; i<anns.length; i++) {
		let ann = anns[i];

		var el = document.createElement("div");
		el.classList = "act act"+ann.actID;
		el.dataset.start = ann.start;
		el.dataset.stop  = ann.stop;

		var p = document.createElement("p");

		let min = Math.floor(ann.start / 60)
		let sec = Math.floor(ann.start % 60)
		let pt  = Math.floor(((ann.start % 60) - sec) * 10)

		min = ("00" + min).substr(-2,2);
		sec = ("00" + sec).substr(-2,2);

		p.innerHTML = min + ":" + sec + "." + pt;

		el.appendChild(p);
		display.appendChild(el);
	}
}

function getCurrentAct(t) {

	if (anns.length == 0)
		anns = [{actID:0, start:0, stop:video.duration}];
	anns = anns.sort(function(a,b){return a.start-b.start});

	for (var i=0; i<anns.length; i++) {
		let ann = anns[i];
		if ((t >= ann.start) && (t < ann.stop))
			return ann;
	}

	return null;
}

///////////////////////////////
/////// Act Selection /////////
///////////////////////////////

var prevActButton = document.createElement("null");

function changeAct(e) {
	let target = e.target;
	let targetID = target.id;
	let actNum = parseInt(e.target.id[3]);

	target.classList.add("act-button-focused");
	prevActButton.classList.remove("act-button-focused");

	prevActButton = target;

	let time = video.currentTime;

	let prevAct = getCurrentAct(time);
	anns.splice(anns.indexOf(prevAct), 1);

	if (time == prevAct.start) {
		var ann = {
			actID: actNum,
			start: prevAct.start,
			stop:  prevAct.stop
		}
		anns.push(ann);
	} else {
		var ann1 = {
			actID: prevAct.actID,
			start: prevAct.start,
			stop:  time
		};
		var ann2 = {
			actID: actNum,
			start: time,
			stop:  prevAct.stop
		};

		anns.push(ann1);
		anns.push(ann2);
	}

	convertAnns();
	updateDisplay();
	writeAnns();
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
let b10 = document.getElementById("act9-button");

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
b10.addEventListener("click", changeAct);

/////////////////////////////////
///////// Init Display //////////
/////////////////////////////////

var segments = display.childNodes;

function initDisplay() {
	if (video.duration == null || !gotAnns)
		return;

	if (anns.length == 0)
		anns = [{actID:0, start:0, stop:video.duration}];

	convertAnns();
	updateDisplay();

	switch (anns[0].actID) {
		case 0:
			b = b0;
			break;
		case 1:
			b = b1;
			break;
		case 2:
			b = b2;
			break;
		case 3:
			b = b3;
			break;
		case 4:
			b = b4;
			break;
		case 5:
			b = b5;
			break;
		case 6:
			b = b6;
			break;
		case 7:
			b = b7;
			break;
		case 8:
			b = b8;
			break;
		case 9:
			b = b9;
			break;
		case 10:
			b = b10;
			break;
		default:
			b = b0;
	}

	b.classList.add("act-button-focused");
	prevActButton = b;
}

video.addEventListener("durationchange", function() {
	duration = video.duration;
	display.dataset.duration = video.duration;
	initDisplay();
});

/////////////////////////////////
//////// Update Display /////////
/////////////////////////////////

function updateDisplay() {
	segments = display.childNodes;

	for (var i=0; i<segments.length; i++) {
		var segm = segments[i];
		if (segm.nodeType != 1)
			continue;

		let start = segm.dataset.start;
		let stop  = segm.dataset.stop;

		let len = (stop - start) / video.duration;

		segm.style.width = len*100 + "%";
	}
}

///////////////////////////////
/////////// Speed /////////////
///////////////////////////////

var slider = document.getElementById("speed-slider");
var speed_disp = document.getElementById("speed-disp");

slider.addEventListener("change", function() {
	speed = slider.value;
	speed_disp.innerHTML = "Speed: " + parseFloat(speed).toFixed(1);
	video.playbackRate = speed;
});

///////////////////////////////
//////////// End //////////////
///////////////////////////////
