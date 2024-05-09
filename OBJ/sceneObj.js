//object data

var verts3 = [
[100,0,100],
[100,0,-100],
[-100,0,100],
[-100,0,-100],
];
	
var polys3 = [
[0,2,1,[50,50,60]],
[3,1,2,[50,50,60]]
];

var sceneObj = new object(verts3,polys3,[sceneObjTran]);