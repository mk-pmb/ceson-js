/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
/*global define:true */

(function (EX, trim) {
  'use strict';

  var startCmt = /^([\s,\[\{\}\]]*)\/(\*|\/)/, endBlkCmt = /\*\/([\s,\]\}]*)$/;

  trim = (''.trim ? function (s) { return s.trim(); } : function (s) {
    return (s && s.replace(/^\s+/, '').replace(/\s+$/, ''));
  });


  function chopPrevChar(lines, chop) {
    var prevIdx = lines.length - 1, prevLn = lines[prevIdx];
    if (!prevLn) { return; }
    if (prevLn.slice(-1) === chop) { lines[prevIdx] = prevLn.slice(0, -1); }
  }


  function ceson2json(ceson) {
    if (!ceson) { return false; }
    if (typeof ceson !== 'string') { return false; }
    var json = [], inBlockComment = false, strConcat = false, afterCmt;
    ceson = ceson.split(/\n\s*/);
    if (ceson[0].slice(0, 1) === '\uFEFF') { ceson[0] = ceson[0].slice(1); }
    function parseLine(ln) {
      ln = trim(ln);
      if (!ln) { return; }
      if (inBlockComment) {
        afterCmt = endBlkCmt.exec(ln);
        if (!afterCmt) { return; }
        inBlockComment = false;
        ln = trim(afterCmt[1]);
      }
      inBlockComment = startCmt.exec(ln);
      if (inBlockComment) {
        ln = inBlockComment[1];
        if (inBlockComment[2] === '/') {
          // line comment. there can't be anything after it.
          inBlockComment = false;
        } else {
          // block comment. does it end in the same line?
          afterCmt = endBlkCmt.exec(ln);
          inBlockComment = !afterCmt;
          if (afterCmt) { ln += afterCmt[1]; }
        }
        ln = trim(ln);
      }
      switch (ln[0]) {
      case undefined:
        return;
      case '}':
      case ']':
        chopPrevChar(json, ',');
        break;
      case '+':
        chopPrevChar(json, '"');
        ln = json.pop() + ln.replace(/^\+\s*"/, '');
        break;
      case '"':
        if (strConcat) { ln = json.pop() + ln.slice(1); }
        break;
      }
      strConcat = (ln.slice(-1) === '+');
      if (strConcat) { ln = ln.replace(/"\s*\+$/, ''); }
      json.push(ln);
    }
    ceson.forEach(parseLine);
    return json.join('\n');
  }


  EX = function parseCeson(data, syntaxErrorSymbol) {
    data = String(data || '');
    if (!data) { return syntaxErrorSymbol; }
    data = ceson2json(data);
    if (!data) { return syntaxErrorSymbol; }
    try {
      data = JSON.parse(data);
    } catch (jsonErr) {
      if (jsonErr && (typeof jsonErr === 'object')) { jsonErr.input = data; }
      if (syntaxErrorSymbol === true) { throw jsonErr; }
      if (typeof syntaxErrorSymbol === 'function') {
        return syntaxErrorSymbol(jsonErr, data);
      }
      if (jsonErr instanceof SyntaxError) { return syntaxErrorSymbol; }
      data = String(jsonErr);
      if (/^\S*syntax(error|)\b/i.exec(data)) { return syntaxErrorSymbol; }
      throw jsonErr;
    }
    return data;
  };


  EX.startCmt = startCmt;
  EX.endBlkCmt = endBlkCmt;
  EX.ceson2json = ceson2json;


  // Unified export
  if (typeof module === 'object') {
    if (typeof ((module || false).exports || false) === 'object') {
      module.exports = EX;
    }
  }
  if ((typeof define === 'function') && define.amd) {
    define(function () { return EX; });
  }
}());
