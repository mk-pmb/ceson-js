/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function () {

  function once(f) {
    if (typeof f.calledOnce === 'boolean') { return f; }
    function g() {
      if (g.calledOnce) { throw new Error(once.errDupe); }
      g.calledOnce = true;
      return f.apply(this, arguments);
    }
    g.calledOnce = false;
    return g;
  }
  once.errDupe = 'duplicate invocation of once()-d function';

  return once;
}());
