// -*- coding: utf-8, tab-width: 2 -*-

import tu from './lib/test_util.mjs';

function w(n) { return { wrapped: true, style: n }; }

tu.verifyExampleFile('wrap.amd', w('amd'));
tu.verifyExampleFile('wrap.commonjs', w('commonjs'));
tu.verifyExampleFile('wrap.jsonp', w('jsonp'));
tu.verifyExampleFile('wrap.js-var', w('js var'));
