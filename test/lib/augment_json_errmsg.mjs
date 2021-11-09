// -*- coding: utf-8, tab-width: 2 -*-

function atPosition(msg) {
  const idx = atPosition.rgx.exec(msg);
  return (idx && +idx[1]);
}
atPosition.rgx = / in JSON at position ([0-9]+)$/;


function preview(data, idx, before, after) {
  let bef = Math.min(before, data.length);
  bef = data.substr(idx - bef, bef);
  const aft = (bef + data.substr(idx, after))
    .replace(/\t/g, '\u21B9')
    .replace(/\r/g, '\u21A9')
    .replace(/\n/g, '\u21B2');
  return ('    »' + aft + '«\n     ' + bef.replace(/[\S\s]/g, ' ') + '^');
}


function augmentJsonErrmsg(err) {
  if (!err) { return err; }
  if (!(err instanceof SyntaxError)) { return err; }
  const input = String(err.input || err.json || '');
  if (!input) { return err; }
  const msg = err.message;
  if (!msg) { return err; }

  const idx = atPosition(msg, input, err);
  if (!idx) { return err; }
  // eslint-disable-next-line no-param-reassign
  err.message += '\n' + preview(input, idx, 64, 16);
  // eslint-disable-next-line no-param-reassign
  delete err.input;
  return err;
};


export default augmentJsonErrmsg;
