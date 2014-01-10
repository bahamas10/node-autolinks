var autolinks = require('../');

var assert = require('assert');

test('no change',
    {
      html: 'no change',
      markdown: 'no change'
    }
);

test('a link to google: http://google.com here',
    {
      html: 'a link to google: <a href="http://google.com">http://google.com</a> here',
      markdown: 'a link to google: [http://google.com](http://google.com) here'
    }
);

test('a relative link to google: www.google.com here',
    {
      html: 'a relative link to google: <a href="http://www.google.com">www.google.com</a> here',
      markdown: 'a relative link to google: [www.google.com](http://www.google.com) here'
    }
);

test('a mailto link for dave@daveeddy.com here',
    {
      html: 'a mailto link for <a href="mailto:dave@daveeddy.com">dave@daveeddy.com</a> here',
      markdown: 'a mailto link for [dave@daveeddy.com](mailto:dave@daveeddy.com) here'
    }
);

test('an already formatted link to [google](http://google.com)',
    {
      html: 'an already formatted link to [google](<a href="http://google.com">http://google.com</a>)'
    , markdown: 'an already formatted link to [google](http://google.com)'
    });

test('an already formatted relative link to [google](www.google.com)',
    {
      // This looks wrong (the close paran inside) but is actually correct, since parens
      // are a valid URL character
      html: 'an already formatted relative link to [google](<a href="http://www.google.com)">www.google.com)</a>'
    , markdown: 'an already formatted relative link to [google](www.google.com)'
    });

function test(s, o) {
  console.log('===> %s <===', s);
  Object.keys(o).forEach(function(fmt) {
    var a = autolinks(s, fmt);
    console.log('== %s == conversion to %s', a, fmt);
    assert.strictEqual(a, o[fmt]);
  });
  console.log('ok\n');
}
