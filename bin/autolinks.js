#!/usr/bin/env node
/**
 * Automatically turn URL's into links
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 5/13/13
 * License: MIT
 */

var autolinks = require('../');
var arg = process.argv[2];
if (arg === '-h' || arg === '--help' || arg === 'help' || arg === 'formats') {
  console.log([
      'Usage: autolinks [format]',
      '',
      'Pipe data in to be auto linked over stdin',
      '',
      'Formats: (html is assumed)',
      '  ' + autolinks.supportedFormats.join(', ')
      ].join('\n'));
  process.exit(0);
}
process.stdin.resume();
process.stdin.on('data', function(data) {
  process.stdout.write(autolinks(data.toString(), process.argv[2]));
});
