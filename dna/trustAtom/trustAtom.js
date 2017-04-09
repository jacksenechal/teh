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
  return getHashes(params).map(function(hash) {
    return get(hash).C
  })
}

function getHashes(params) {
  var atoms = getRawAtoms(params)
  var hashes = []
  for (var i = 0; i < atoms.length; i++) {
    var atom = atoms[i]
    hashes.push(atom.H)
  }
  return hashes
}

function getRawAtoms(params) {
  var targetId = commit('entity', params.target)
  var links = getlink(targetId, 'trustAtom')
  if (links.name === 'HolochainError') {
    if (links.message === 'No values for trustAtom') {
      return []
    } else {
      throw (links)
    }
  } else {
    return links.Hashes
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

