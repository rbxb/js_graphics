//object data

var verts1 = [
[0,0,0],
[-1,1,1],
[-1,1,0],
[0,1,0],
[0,1,1],
[0,0,1],
[0,0,0],
[1,0,0],
[1,0,1],
[1,-1,1],
[1,-1,0],
[-1,-1,1],
[-1,-1,0]
];
	
var polys1 = [
[2,1,3,   [150,150,150]],
[3,1,4,   [150,150,150]],
[3,4,5,   [150,150,150]],
[6,3,5,   [150,150,150]],
[6,5,7,   [150,150,150]],
[7,5,8,   [150,150,150]],
[7,8,9,   [150,150,150]],
[10,7,9,  [150,150,150]],
[1,2,11,  [150,150,150]],
[11,2,12, [150,150,150]],
[12,10,9, [150,150,150]],
[11,12,9, [150,150,150]],
[9,1,11,  [150,150,150]],
[4,1,5,   [150,150,150]],
[8,5,9,   [150,150,150]],
[12,2,10, [150,150,150]],
[2,3,6,   [150,150,150]],
[6,7,10,  [150,150,150]],
];

var object1 = new object(verts1,polys1,[object1tran]);