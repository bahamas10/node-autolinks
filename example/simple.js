var autolinks = require('../');

var s = 'my email is dave@daveeddy.com and my homepage is http://www.daveeddy.com';
console.log(s);
console.log('html => %s', autolinks(s));
console.log('markdown => %s', autolinks(s, 'markdown'));
