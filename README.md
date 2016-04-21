
CESON: Commented ECMAScript Object Notation
===========================================
Yet another JSON derivative. Mostly like JSON, but:

  * It will always be a strict subset of ECMAScript.
  * Definition of whitespace and acceptable line endings is inherited from
    the ECMAScript spec, to avoid problems with Unicode line terminators.
  * Line comments and block comments work as in ECMAScript, but with some
    restrictions for easier parsing.
    * In the line where a comment starts, in front of that comment,
      the only acceptable characters are:
      * whitespace
      * byte order marks (so you don't have to care whether they are whitespace)
      * commas and
      * opening brackets that, in JSON, could open a data container.
    * In the line where a block comment ends, any remainder of that line may
      only consist of
      * whitespace
      * commas and
      * closing brackets that, in JSON, could close a data container.
  * The validity and effect of commas at the end of data containers is
    inherited from ECMAScript.


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
