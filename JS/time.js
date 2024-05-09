//time function
var t = 0;
var lastStart = 0;
var lastFPS = -1000;
function time(start) {
	updateInput();
	if (start-lastFPS > 100) {
		document.getElementById("fps").innerHTML = Math.round(1000/(start-lastStart));
		lastFPS = start;
	}
	lastStart = start;
	t = start/10;
}