/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var ceson = require('ceson'), eq = require('equal-pmb'),
  cesonPath = require.resolve('../doc/examples/felidae.ceson'),
  expectedFelidae   = require('../doc/examples/felidae.json'),
  augmentJsonErrmsg = require('./augment_json_errmsg.js');


function report(readErr, cesonData) {
  if (readErr) {
    readErr = augmentJsonErrmsg(readErr);
    console.error('-ERR cannot read', cesonPath, readErr);
    return process.exit(2);
  }
  eq(cesonData, expectedFelidae);
  console.log("+OK felidae test passed.");   //= "+OK felidae test passed."
}


ceson.parseFile({ path: cesonPath, syntaxErrorSymbol: true }, report);

























/* scroll */
