const unusedVars = [
  'create',
  'd',
  'genesis',
  'getAtoms',
  'getHashes',
  'relate',
]

const config = {
  extends: 'comakery',
  env: {
    es6: false,
  },
  'globals': {
    '$': false,
    'commit': false,
    'debug': false,
    'expose': false,
    'get': false,
    'getlink': false,
    'HC': false,
    'props': false,
  },
  'rules': {
    'func-style': [2, 'declaration'],
    'no-unused-vars': [2, { 'varsIgnorePattern': '^(' + unusedVars.join('|') + '|validate\\w*)$' }],
  },
}

module.exports = config
