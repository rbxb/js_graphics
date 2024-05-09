var textureList = ["texture/texture1.PNG"];

var textures = [];

//canvas
texturecvs = document.getElementById('texturecvs');
texturectx = texturecvs.getContext('2d');

for (var i = 0; i < textureList.length; i++) {
	textureimg = new Image();
	textureimg.src = textureList[i];
	textureimg.onload = function(){
		texturecvs.width = textureimg.width;
		texturecvs.height = textureimg.height;
		texturectx.drawImage(textureimg,0,0);
		textures[i] = new texture(texturecvs,texturectx);
  }
}