/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function () {
  var EX;

  function atPosition(msg) {
    var idx = atPosition.rgx.exec(msg);
    return (idx && +idx[1]);
  }
  atPosition.rgx = / in JSON at position ([0-9]+)$/;


  function preview(data, idx, before, after) {
    before = Math.min(before, data.length);
    before = data.substr(idx - before, before);
    after = (before + data.substr(idx, after)
      ).replace(/\t/g, '\u21B9'
      ).replace(/\r/g, '\u21A9'
      ).replace(/\n/g, '\u21B2');
    return ('    »' + after + '«\n     '
      + before.replace(/[\S\s]/g, ' ') + '^');
  }


  EX = function augmentJsonErrmsg(err) {
    if (!err) { return err; }
    if (!(err instanceof SyntaxError)) { return err; }
    var input = String(err.input || err.json || ''), msg = err.message, idx;
    if (!input) { return err; }
    if (!msg) { return err; }

    idx = atPosition(msg, input, err);
    if (!idx) { return err; }
    err.message += '\n' + preview(input, idx, 64, 16);
    delete err.input;
    return err;
  };



  return EX;
}());
