/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = module.exports, parseCeson = require('./parse'),
  fs = require('fs');


EX.parse = parseCeson;


EX.parseCallbackData = function (readErr, data, deliver) {
  if ((!deliver) && (typeof this === 'function')) { deliver = this; }
  if (readErr) { return deliver(readErr); }
  try {
    data = parseCeson(data, deliver.parseOpts);
  } catch (parseErr) {
    return deliver(parseErr);
  }
  return deliver(null, data);
};


EX.parseFile = function (fileOpts, deliver) {
  if (typeof fileOpts === 'string') { fileOpts = { path: fileOpts }; }
  if (fileOpts.encoding === undefined) { fileOpts.encoding = 'UTF-8'; }
  deliver = deliver.bind(fileOpts);
  deliver.parseOpts = fileOpts;
  fs.readFile(fileOpts.path, fileOpts, EX.parseCallbackData.bind(deliver));
};


EX.stringify = function (data) {
  return JSON.stringify(data, null, 2
    ).replace(/(\n\s*[\]\}])/g, ',$1'
    ).replace(/(\[|\{)\n\s*/g, '$1 ');
};


























/* scroll */
