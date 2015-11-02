autolinks
=========

Automatically turn URLs into links

Installation
------------

To use locally

    npm install autolinks

To use the command line tool `autolinks`

    npm install -g autolinks

Example
-------

``` js
var autolinks = require('autolinks');

var s = 'my email is dave@daveeddy.com and my homepage is http://www.daveeddy.com';
console.log(s);
console.log('html => %s', autolinks(s));
console.log('html attrs => %s', autolinks(s, 'html', {title: "hello"}));
console.log('markdown => %s', autolinks(s, 'markdown'));
```

yields

    my email is dave@daveeddy.com and my homepage is http://www.daveeddy.com
    html => my email is <a href="mailto:dave@daveeddy.com">dave@daveeddy.com</a> and my homepage is <a href="http://www.daveeddy.com">http://www.daveeddy.com</a>
    html => my email is <a title="hello" href="mailto:dave@daveeddy.com">dave@daveeddy.com</a> and my homepage is <a title="hello" href="http://www.daveeddy.com">http://www.daveeddy.com</a>
    markdown => my email is [dave@daveeddy.com](mailto:dave@daveeddy.com) and my homepage is [http://www.daveeddy.com](http://www.daveeddy.com)

Usage
-----

### `autolinks(s, [fmt], [opts])`

- `s`: the string to parse
- `fmt`: an optional format string (markdown, html, etc.) `html` is default
- `opts`: a list of options; in HTML, a dictionary of additional HTML attributes with their respective values

returns the parsed string

Command Line
------------

    $ echo 'a link to google http://www.google.com here' | autolinks
    a link to google <a href="http://www.google.com">http://www.google.com</a> here
    $ echo 'a link to google http://www.google.com here' | autolinks markdown
    a link to google [http://www.google.com](http://www.google.com) here

License
-------

MIT License
