
CESON: Commented ECMAScript Object Notation
===========================================

<!--#echo json="package.json" key="description" -->
Yet another JSON derivative, aimed to be easy to use for humans as well as for
low-level tools.
<!--/#echo -->

## ✨ 📖 ✨ [spec][spec] ✨ 📖 ✨ [example] ✨ 📖 ✨
  [spec]: doc/spec-v1.md
  [example]: doc/examples/felidae.ceson

Main features:

  * True subset of ECMAScript.
  * Parser-friendly (block and line) comments.
  * Comma after last value in data containers. (optional)
  * Guaranteed support for UTF-8 BOM.


Related projects:

  * [JSONv5](http://json5.org/): A lot more flexible, and thus a lot harder
    to safely handle with low-level tools like [sed](http://sed.sf.net/).
  * [strip-json-comments](https://github.com/sindresorhus/strip-json-comments)


Usage
-----
see [doc/demo/usage.js](doc/demo/usage.js)
:TODO:

<!--!#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
```javascript
var ceson = require('ceson');
D.result  = ceson(null);
D.expect('===',           null);
```
<!--/include-->

```bash
$ ceson foo
bar
```


<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
