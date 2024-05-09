var key_SPACE = 0;
var key_SHIFT = 0;
var key_W     = 0;
var key_S     = 0;
var key_A     = 0;
var key_D     = 0;

var shaderMode = 0;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) key_SPACE = 1;
	if(event.keyCode == 16) key_SHIFT = 1;
	if(event.keyCode == 87) key_W     = 1;
	if(event.keyCode == 83) key_S     = 1;
	if(event.keyCode == 65) key_A     = 1;
	if(event.keyCode == 68) key_D     = 1;
	if(event.keyCode == 69) shaderMode = 0;
	if(event.keyCode == 82) shaderMode = 1;
	if(event.keycode == 84) shaderMode = 2;
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 32) key_SPACE = 0;
	if(event.keyCode == 16) key_SHIFT = 0;
	if(event.keyCode == 87) key_W     = 0;
	if(event.keyCode == 83) key_S     = 0;
	if(event.keyCode == 65) key_A     = 0;
	if(event.keyCode == 68) key_D     = 0;
});

function moveCallback(e) {
	var mX = 
		e.movementX ||
		e.mozMovementX ||
		e.webkitMovementX ||
		0;
	var mY =
		e.movementY ||
		e.mozMovementY ||
		e.webkitMovementY ||
		0;
	document.getElementById("mouse").innerHTML = mX + "  " + mY;
	cameraRot[1] = cameraRot[1] - -(mX) * panX;
	cameraRot[0] = cameraRot[0] - -(mY) * panY;
}

var pointerLocked = false;
function pointerLock() {
	if (pointerLocked == false) {
		pointerLocked = true;
		document.addEventListener("mousemove", moveCallback, false);
		cvs.removeEventListener("click",cvs.requestPointerLock);
		window.requestAnimationFrame(frame);
	} else {
		pointerLocked = false;
		document.removeEventListener("mousemove", moveCallback, false);
		cvs.addEventListener("click",cvs.requestPointerLock);
	}
}
cvs.addEventListener("click",cvs.requestPointerLock);

cvs.requestPointerLock = 
	cvs.requestPointerLock ||
	cvs.mozRequestPointerLock ||
	cvs.webkitRequestPointerLock;

document.exitPointerLock = 
	document.exitPointerLock ||
	document.mozExitPointerLock ||
	document.webkitExitPointerLock;

document.addEventListener('pointerlockchange', pointerLock, false);
document.addEventListener('mozpointerlockchange', pointerLock, false);
document.addEventListener('webkitpointerlockchange', pointerLock, false);

var key_MOUSE = 0;
document.body.onmousedown = function(event) { 
	key_MOUSE = 1;
}
document.body.onmouseup = function(event) {
	key_MOUSE = 0;
}

var panX = 0.1;
var panY = panX / 2;



function updateInput() {
	if (key_SPACE == 1) cameraPos[1] = cameraPos[1] - upDownSpeed;
	if (key_SHIFT == 1) cameraPos[1] = cameraPos[1] + upDownSpeed;
	if (key_W     == 1) move([0,0,moveSpeed]);
	if (key_S     == 1) move([0,0,-moveSpeed]);
	if (key_A     == 1) move([-moveSpeed,0,0]);
	if (key_D     == 1) move([moveSpeed,0,0]);
}
var moveSpeed = 0.5;
var upDownSpeed = 0.5;


function move(v) {
	var oldVert = new vert(cameraPos);
	var addVert = new vert( rotate( v, new rotation(new vert(cameraRot)) ) );
	var newVert = combineVerts(oldVert,addVert,"+");
	cameraPos = [newVert.x,oldVert.y,newVert.z];
}