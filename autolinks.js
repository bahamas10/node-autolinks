/**
 * Automatically turn URL's into links
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 5/13/13
 * License: MIT
 *
 * Contributors:
 *  - Linus Unnebäck <linus@folkdatorn.se>
 */

var escape = require('escape-html');

var URIre = /\b(?:https?|ftp):\/\/[a-z\u00c0-\u01bf0-9-+&@#\/%?=~_|!:,.;]*[a-z\u00c0-\u01bf0-9-+&@#\/%=~_|]/gim;
var incompleteURIre = /(^|[^\/])(www\.[^\s)>]+(\b|$))/gim;
var mailre = /\w+@[a-z\u00c0-\u01bf_]+?(?:\.[a-z\u00c0-\u01bf]{2,6})+/gim;

var formats = {
  'html': function (title, url, opts) {
    var attrs = [];
    opts = typeof opts !== 'undefined'? opts: {};
    opts.href = url;
    for (var key in opts) {
      var value = opts[key];
      attrs.push(key + '="' + escape(value) + '"');
    }
    return '<a ' + attrs.join(' ') + '>' + title + '</a>';
  },
  'markdown': function (title, url) {
    return '[' + title + '](' + url + ')';
  }
};

module.exports = autolinks;
module.exports.supportedFormats = Object.keys(formats);

function autolinks(s, format, opts) {
  var fn;

  switch (typeof format) {
    case 'undefined':
      fn = formats.html;
      break;
    case 'string':
      fn = formats[format];
      break;
    case 'function':
      fn = format;
      break;
  }

  if (fn === undefined) {
    throw new Error('Unkown format: ' + format);
  }

  return s.replace(URIre, function ($0) { return fn($0, $0, opts); })
          .replace(incompleteURIre, function ($0, $1, $2) { return $1 + fn($2, 'http://' + $2, opts); })
          .replace(mailre, function ($0) { return fn($0, 'mailto:' + $0, opts); });

}
