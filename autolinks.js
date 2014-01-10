/**
 * Automatically turn URL's into links
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 5/13/13
 * License: MIT
 */

var URIre = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim
  , incompleteURIre = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  , mailre = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim
  , formats = ['markdown', 'html']
  , autolinks;

autolinks = function (s, type) {
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

module.exports = autolinks;
