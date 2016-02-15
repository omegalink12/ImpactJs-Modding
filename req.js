fs = require('fs');
var contents = fs.readFileSync(process.argv[2], 'utf8');
var file="digraph g{\n";

var modreg = /ig\s*\.\s*module\s*\(([\s\S]*?)\)\s*(?:\.\s*requires\s*\(([\s\S]*?)\)\s*)?/g;
var match = modreg.exec(contents);
while (match != null) {
	match[1]='"'+match[1].replace(/["\'\s]/g,"")+'"';
    console.log("Module: " + match[1]);
    if(match[2]==undefined){
		file+=match[1]+'\n';
		match = modreg.exec(contents);
		continue;
    }
	req=match[2].split(",");
	for(var i=0;i<req.length;i++){
		req[i]='"'+req[i].replace(/["\'\s]/g,"")+'"';
		file+=match[1]+'->'+req[i]+'\n';
	}
    match = modreg.exec(contents);
}

file+="}";
fs.writeSync(fs.openSync("req.gv",'w'), file, function(err) {
		console.log(err);
});

//run dot -Tsvg req.gv -o req.svg
