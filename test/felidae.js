/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var tu = require('./test-util.js'), ceson = require('ceson'),
  async = require('async'),
  cesonPath = require.resolve('../doc/examples/felidae.ceson'),
  expectedFelidae   = require('../doc/examples/felidae.json');


async.parallel([
  function (next) {
    tu.readTransformCompare(cesonPath, expectedFelidae, next);
  },
], function (err) {
  if (err) { tu.fail(err); }
  console.log("+OK felidae test passed.");   //= "+OK felidae test passed."
});





























/* scroll */
