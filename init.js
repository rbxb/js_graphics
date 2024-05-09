var scripts = [
"JS/time.js",
"JS/canvas.js",
"JS/classes.js",
"JS/geometry.js",
"JS/animate.js",
"JS/draw.js",
"OBJ/anis.js",
"OBJ/object1.js",
"OBJ/object2.js",
"OBJ/sceneObj.js",
"JS/main.js",
"JS/input.js"
];

var initi = 0;

function buildScript() {

	if (initi < scripts.length) {
		var script = document.createElement("script");
		script.src = scripts[initi];
		script.id = "script" + initi;
		//builds script element
		document.head.appendChild(script);
		//places script element
		script.onload = function () {
			console.log("loaded " + scripts[initi]);
			initi++;
			buildScript();
		};
	}
	else {
		console.log("init complete");
		window.requestAnimationFrame(frame);
	}
}

buildScript();