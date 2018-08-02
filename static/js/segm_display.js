/////////////////////////////////
///////////// Init //////////////
/////////////////////////////////

var display = document.getElementById("segm_display");
var segments = display.childNodes;

let duration = display.dataset.duration;

for (var i=0; i<segments.length; i++) {
	var segm = segments[i];
	if (segm.nodeType != 1)
		continue;

	let start = segm.dataset.start;
	let stop  = segm.dataset.end;

	let len = ((stop - start) / duration) * 100;

	segm.style.width = len + "%";
}

/////////////////////////////////
//////////// Update /////////////
/////////////////////////////////

function updateDisplay() {
	segments = display.childNodes;

	for (var i=0; i<segments.length; i++) {
		var segm = segments[i];
		if (segm.nodeType != 1)
			continue;

		let start = segm.dataset.start;
		let stop  = segm.dataset.end;

		let len = (stop - start) / duration;

		segm.style.width = len + "%";
	}
}
