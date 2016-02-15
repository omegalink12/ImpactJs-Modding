fs = require('fs');
path = require('path');

var mkdirpSync = function (dirpath) {
  var parts = dirpath.split('/');
  console.log(parts);
  for( var i = 1; i < parts.length; i++ ) {
	console.log(path.join.apply(null, parts.slice(0, i)) );
	try{
		fs.mkdirSync( path.join.apply(null, parts.slice(0, i)) );
    }catch(e){}
  }
}

var fpath = function(module){
	return module.replace(/[\s\'"]|\/\/.*|\/\*.*\*\//g,"").replace(/\./g,"/")+".js";
}

var contents = fs.readFileSync(process.argv[2], 'utf8').split(/ig\.baked\s*=\s*true\s*;/);
var mod="bootstrap";
var mpath=fpath(mod);
var modreg = /ig\s*\.\s*module\s*\(([\s\S]*?)\)/g;

for(var i=0;i<contents.length;i++){
	console.log(mod);
	mkdirpSync(mpath);
	fs.writeFile(mpath, contents[i], function() {}); 
	if(i+1<contents.length){
		mod=(/ig\s*\.\s*module\s*\(([\s\S]*?)\)/g.exec(contents[i+1]))[1];
		mpath=fpath(mod);
	}
}
