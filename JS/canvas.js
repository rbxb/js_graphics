//canvas
cvs = document.getElementById('canvas');
cvs.height = cvs.width / 2;
ctx = cvs.getContext('2d');

var W = cvs.width;
var H = cvs.height;

var w = W / 2;
var h = H / 2;

 ctx.imageSmoothingEnabled = false;

//view geometry
var FOV = 70;
var dis = Math.round((w / Math.tan( FOV / 2 )*100)/100);

var near = 20;
var far = 999;

//img
var frameimg = ctx.createImageData(W,H);
var img = frameimg.data;
for (mi = 0; mi < img.length; mi = mi + 4) {
		img[mi]     = 0;
		img[mi + 1] = 0;
		img[mi + 2] = 0;
		img[mi + 3] = 255;
	}

//clear img
function clearIMG() {
	for (mi = 0; mi < img.length; mi = mi + 4) {
		img[mi]     = 0;
		img[mi + 1] = 0;
		img[mi + 2] = 0;
		img[mi + 3] = 255;
	}
}

//z buffer
var zd = new Array(W * H);
//creates buffer array

//clear z buffer
function clearZBuffer() {
	for (bi = 0; bi < zd.length; bi++) {
		zd[bi] = far;
	}
}
