/**
 * Automatically turn URL's into links
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 5/13/13
 * License: MIT
 */

var URIre = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
var incompleteURIre = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
var mailre = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;

var formats = ['markdown', 'html'];

module.exports = autolinks;

function autolinks(s, type) {
  var ret = s;
  switch (type) {
    case 'markdown':
      ret = s.replace(URIre, '[$&]($&)')
             .replace(incompleteURIre, '$1[$2](http://$2)')
             .replace(mailre, '[$&](mailto:$&)');
      break;
    case 'html':
    default:
      ret = s.replace(URIre, '<a href="$&">$&</a>')
             .replace(incompleteURIre, '$1<a href="http://$2">$2</a>')
             .replace(mailre, '<a href="mailto:$&">$&</a>');
      break;
  }
  return ret;
}

if (!module.parent) {
  var arg = process.argv[2];
  if (arg === '-h' || arg === 'help' || arg === 'formats') {
    console.log([
      'Usage: autolinks [format]',
      '',
      'Pipe data in to be auto linked over stdin',
      '',
      'Formats: (html is assumed)',
      '  ' + formats.join(', ')
    ].join('\n'));
    process.exit(0);
  }
  process.stdin.resume();
  process.stdin.on('data', function(data) {
    process.stdout.write(autolinks(data.toString(), process.argv[2]));
  });
}
