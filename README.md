
CESON: Commented ECMAScript Object Notation
===========================================
Yet another JSON derivative.
(For comparison with others, see below.)

CESON is mostly like JSON, but:

  * It will always be a strict subset of ECMAScript.
  * Definition of whitespace and acceptable line endings is inherited from
    the ECMAScript spec, to avoid problems with Unicode line terminators.
    * For increased compatibility, outside of values, CESON parsers should
      ignore characters that are whitespace in JSON but not in ECMAScript.
    * CESON defines `simplespace` as any combination of `\t \r\n`
      (U+:TODO:).
  * Line comments and block comments work as in ECMAScript, but with some
    restrictions for easier parsing.
    * In the line where a comment starts, in front of that comment,
      the only acceptable characters are:
      * simplespace
      * byte order marks (so you don't have to care whether they are whitespace)
      * commas and
      * opening brackets that, in JSON, could open a data container.
    * In the line where a block comment ends, any remainder of that line may
      only consist of
      * simplespace
      * commas and
      * closing brackets that, in JSON, could close a data container.
  * You can continue a string in a new line by adding its parts with the plus
    operator (`+`).
    * Except for simplespace and byte order marks, the plus sign has to be
      at the start or end of a line. A line can have plus signs on both sides.
    * Whitespace after the plus sign is allowed only if that whitespace is
      followed by a string part.
  * The validity and effect of commas at the end of data containers is
    inherited from ECMAScript.


Related projects
================
  * [JSONv5](http://json5.org/): A lot more flexible, and thus a lot harder
    to safely handle with low-level tools like `sed`.
  * [strip-json-comments](https://github.com/sindresorhus/strip-json-comments)


ceson-js parser
===============

Usage
-----
:TODO:

```bash
$ ceson foo
bar
```

```javascript
var ceson = require('ceson');
D.result  = ceson(null);
D.expect('===',           null);
```


License
-------
ISC
