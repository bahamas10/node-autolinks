
var assert = require('assert');
var autolinks = require('../');

var data = [{
  input: 'no change',
  html: 'no change',
  markdown: 'no change'
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
}];

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

  var formats = ['html', 'markdown'];

  formats.forEach(function (format) {
    describe('#' + format, function () {

      data.forEach(function (testCase) {
        it('should parse ' + testCase.input, function () {

          var output = autolinks(testCase.input, format);
          assert.equal(output, testCase[format]);

        });
      });

    });
  });

});
