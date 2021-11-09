// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import test from 'p-tape';
import pify from 'pify';
import absdir from 'absdir';

import ceson from '../../ceson.js';
import augmentJsonErrmsg from './augment_json_errmsg.mjs';

const examplesDir = absdir(import.meta, '../../doc/examples');

const parseCesonFile = pify(ceson.parseFile);

const tu = {

  verifyExampleFile(bfn, want) {
    const path = examplesDir(bfn + '.ceson');
    test('Verify ' + bfn + '.ceson', async(t) => {
      t.plan(1);
      let got;
      try {
        got = await parseCesonFile({ path, synErr: true });
      } catch (readErr) {
        throw augmentJsonErrmsg(readErr);
      }
      t.same(got, want);
    });
  },

};



export default tu;
