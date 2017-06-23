var fs = require('fs');
var content = fs.readFileSync('dados.json', 'utf8');
console.log(content);


var string = '{"username":"PedroMatos","password":"11111"}';
var obj = JSON.parse(string);

console.log(obj.username);


console.log("---------------------");


//module.exports.loadJson = function (file, callback) {
  fs.readFile('dados.json', { encoding: 'utf8' }, function (err, data) {
    if (err); // file reading error
    
      // parse and return json to callback
      var json = JSON.parse(data);
		console.log(json.username);

console.log("---- dentro-------");


  
    
  });
//};