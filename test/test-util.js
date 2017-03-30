/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (factory) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = (factory(require, e, m) || m.exports); }
})(function (require) {
  'use strict';

  var EX = {}, eq = require('equal-pmb'),
    augmentJsonErrmsg = require('./augment_json_errmsg.js'),
    ceson = require('ceson');


  EX.fail = function () {
    console.error.apply(console, ['-ERR'].concat(Array.from(arguments)));
    return process.exit(2);
  };


  EX.readTransformCompare = function (cesonFile, expectedData, onEqual) {
    function cmp(readErr, data) {
      if (readErr) {
        readErr = augmentJsonErrmsg(readErr);
        return EX.fail('cannot read', cesonFile, readErr);
      }
      eq(data, expectedData);
      if (onEqual) { return onEqual(); }
    }
    ceson.parseFile({ path: cesonFile, synErr: true }, cmp);
  };


























  return EX;
});
