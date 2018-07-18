const {SHA256} = require('crypto-js');

var password = "12346";
var hash = SHA256(password).toString();

console.log(hash);