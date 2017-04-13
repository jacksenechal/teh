function create(atom) {
  var atomId = commitAtom(atom)

  addMetadata({atomId: atomId, entity: atom.creator})
  addMetadata({atomId: atomId, entity: atom.target})

  if (atom.tags) {
    for (var i = 0; i < atom.tags.length; i++) {
      var tag = atom.tags[i]
      addMetadata({atomId: atomId, entity: tag})
    }
  }
  return atomId
}

function commitAtom(atomData) {
  return commit('trustAtom', JSON.stringify(atomData))
}

function addMetadata(args) {
  var atomId = args.atomId
  var entity = args.entity
  var entityId = commit('entity', entity)
  return relate(entityId, atomId, 'trustAtom')  // sub, obj, pred
}

function relate(base, link, tag) {
  var rel = {Links: [{Base: base, Link: link, Tag: tag}]}
  var relationString = JSON.stringify(rel)
  return commit('relation', relationString)
}

function getAtoms(params) {
  var raw = getRawAtoms(params)
  var atomKeys = keys(raw)
  var atoms = []
  for (var i = 0; i < atomKeys.length; i++) {
    var key = atomKeys[i]
    atoms.push(raw[key])
  }
  return atoms
}

function getHashes(params) {
  return keys(getRawAtoms(params))
}

function getRawAtoms(params) {
  var targetId = commit('entity', params.target)
  var results = getlink(targetId, 'trustAtom', { Load: true })
  if (results.name === 'HolochainError') {
    if (results.message === 'No values for trustAtom') {
      return []
    } else {
      throw (results)
    }
  } else {
    var atoms = {}
    var links = results.Links
    for (var i = 0; i < links.length; i++) {
      atoms[links[i].H] = links[i].E
    }
    return atoms
  }
}

function validate() {
  return true
}

function validateCommit() {
  return true
}

function validatePut() {
  return true
}

function validateLink() {
  return true
}

function genesis() {
  return true
}

function d(arg) {
  debug(JSON.stringify(arg, null, 4))
}

function keys(o) {
  if (o !== Object(o))
    throw new TypeError('Object.keys called on a non-object');
  var k=[],p;
  for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
  return k;
}
