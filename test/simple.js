
var assert = require('assert');
var autolinks = require('../');

var data = [

/*** General ***/

{
  input: 'a simple string',
  html: 'a simple string',
  markdown: 'a simple string'
},{
  input: 'a link to google: http://google.com here',
  html: 'a link to google: <a href="http://google.com">http://google.com</a> here',
  markdown: 'a link to google: [http://google.com](http://google.com) here'
},{
  input: 'a relative link to google: www.google.com here',
  html: 'a relative link to google: <a href="http://www.google.com">www.google.com</a> here',
  markdown: 'a relative link to google: [www.google.com](http://www.google.com) here'
},{
  input: 'a mailto link for dave@daveeddy.com here',
  html: 'a mailto link for <a href="mailto:dave@daveeddy.com">dave@daveeddy.com</a> here',
  markdown: 'a mailto link for [dave@daveeddy.com](mailto:dave@daveeddy.com) here'
},

/*** Parantheses ***/

{
  input: 'a mailto inside parentheses (dave@daveeddy.com).',
  html: 'a mailto inside parentheses (<a href="mailto:dave@daveeddy.com">dave@daveeddy.com</a>).',
  markdown: 'a mailto inside parentheses ([dave@daveeddy.com](mailto:dave@daveeddy.com)).'
},{
  input: 'a link inside parentheses (http://google.com).',
  html: 'a link inside parentheses (<a href="http://google.com">http://google.com</a>).',
  markdown: 'a link inside parentheses ([http://google.com](http://google.com)).'
},{
  input: 'a relative link inside parentheses (www.google.com).',
  html: 'a relative link inside parentheses (<a href="http://www.google.com">www.google.com</a>).',
  markdown: 'a relative link inside parentheses ([www.google.com](http://www.google.com)).'
},

/*** Tags ***/

{
  input: 'a mailto inside tags <dave@daveeddy.com>.',
  html: 'a mailto inside tags <<a href="mailto:dave@daveeddy.com">dave@daveeddy.com</a>>.',
  markdown: 'a mailto inside tags <[dave@daveeddy.com](mailto:dave@daveeddy.com)>.'
},{
  input: 'a link inside tags <http://google.com>.',
  html: 'a link inside tags <<a href="http://google.com">http://google.com</a>>.',
  markdown: 'a link inside tags <[http://google.com](http://google.com)>.'
},{
  input: 'a relative link inside tags <www.google.com>.',
  html: 'a relative link inside tags <<a href="http://www.google.com">www.google.com</a>>.',
  markdown: 'a relative link inside tags <[www.google.com](http://www.google.com)>.'
},

/*** Custom function ***/

{
  input: 'a link http://google.com',
  custom: 'a link (TITLE http://google.com URL http://google.com)'
},

/*** Foreign characters ***/

{
  input: 'a link http://test.com/hallå.pdf',
  custom: 'a link (TITLE http://test.com/hallå.pdf URL http://test.com/hallå.pdf)'
}

];

describe('autolinks', function () {

  it('should throw on unknown format', function () {
    assert.throws(function () {
      autolinks('test string', 'blah');
    });
  });

  it('should use default format', function () {
    var output = autolinks('http://test.com/');
    var expected = '<a href="http://test.com/">http://test.com/</a>';

    assert.equal(output, expected);
  });

  it('should expose list of supported formats', function () {
    var actual = autolinks.supportedFormats;
    var expected = ['html', 'markdown'];

    assert.deepEqual(actual.sort(), expected.sort());
  });

  var formats = ['html', 'markdown', 'custom'];
  var formatArgument = {
    html: 'html',
    markdown: 'markdown',
    custom: function (title, url) {
      return '(TITLE ' + title + ' URL ' + url + ')';
    }
  }

  formats.forEach(function (format) {
    describe('#' + format, function () {

      data.forEach(function (testCase) {
        if (testCase.hasOwnProperty(format)) {
          it('should parse ' + testCase.input, function () {

            var output = autolinks(testCase.input, formatArgument[format]);
            assert.equal(output, testCase[format]);

          });
        }
      });

    });
  });

});
