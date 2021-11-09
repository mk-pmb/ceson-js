// -*- coding: utf-8, tab-width: 2 -*-

import tu from './lib/test_util.mjs';

tu.verifyExampleFile('str-concat.key', {
  'concatenated object keys': 'not CESON, but parsers may support it anyway',
});

tu.verifyExampleFile('str-concat.value', { a: 'concat', b: 'concat' });
