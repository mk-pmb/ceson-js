
CESON: Commented ECMAScript Object Notation
===========================================

<!--#echo json="package.json" key="description" -->
Yet another JSON derivative, aimed to be easy to use for humans as well as for
low-level tools.
<!--/#echo -->

## ✨ 📖 ✨ [spec][spec] ✨ 📖 ✨ [example][example] ✨ 📖 ✨
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



API
---

For examples, see [test/felidae.js](test/felidae.js).


### .stringify(data)

Return a CESON representation of `data` as a string.


### .parse(ceson[, opts])

Return the data represented by the string `ceson` if it can be parsed,
or `undefined` in case of a SyntaxError. Other errors are re-thrown.

You can modify the behavior by providing a config object `opts`.
The supported keys are:

* `synErr`, `othErr`: Modify error handling. Documented at module
  [json-parse-pmb](https://github.com/mk-pmb/json-parse-pmb-js)
  since that's used under the hood.


### .parseFile(filename, callback)

Try to parse CESON text file `filename`, then report to `callback`.


### .parseFile(fileOpts, callback)

(no description yet)


### .parseCallbackData(readErr, data, callback)

(no description yet)






<!--#toc stop="scan" -->





License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
