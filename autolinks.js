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
    // Does not match already marked-down links or image srcs
  , mdURIre = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|](\b|$)(?!\.|\)|\s+"[\w\d\s]*?"\s*\))/gim
  , mdIncompleteURIre = /(^|[^\/])(www\.[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])(\b|$)(?!\.|\)|\s+"[\w\d\s]*?"\s*\))/gim
  , autolinks;

autolinks = function (s, type) {
  var ret = s;
  switch (type) {
    case 'markdown':
      ret = s.replace(mdURIre, '[$&]($&)')
             .replace(mdIncompleteURIre, '$1[$2](http://$2)')
             .replace(mailre, '[$&](mailto:$&)');
      break;
    // html case will be handled by default
    default:
      ret = s.replace(URIre, '<a href="$&">$&</a>')
             .replace(incompleteURIre, '$1<a href="http://$2">$2</a>')
             .replace(mailre, '<a href="mailto:$&">$&</a>');
      break;
  }
  return ret;
};

module.exports = autolinks;

