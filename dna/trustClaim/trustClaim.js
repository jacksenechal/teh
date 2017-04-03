expose('claim', HC.JSON)
function claim(params) {
  var claimId = putClaim(params)

  putClaimMetadata({claimId: claimId, entity: params.creator})
  putClaimMetadata({claimId: claimId, entity: params.target})

  if (params.tags) {
    for (var i = 0; i < params.tags.length; i++) {
      var tag = params.tags[i]
      putClaimMetadata({claimId: claimId, entity: tag})
    }
  }
  return claimId
}

expose('putClaim', HC.JSON)
function putClaim(params) {
  return commit('trust_atom', JSON.stringify(params.atom))
}

expose('putClaimMetadata', HC.JSON)
function putClaimMetadata(args) {
  var claimId = args.claimId
  var entity = args.entity
  var entityId = commit('entity', entity)
  return relate(entityId, claimId, 'claim')  // sub, obj, pred
}

expose('get', HC.JSON)
function get(params) {
  var targetId = commit('entity', params.target)
  var result = getlink(targetId, 'claim')
  if (result.name === 'HolochainError') {
    if (result.message === 'hash not found') {
      return []
    } else {
      throw (result)
    }
  } else {
    return result.Hashes
  }
}

expose('getHashes', HC.JSON)
function getHashes(params) {
  var claims = get(params)
  var hashes = []
  for (var i = 0; i < claims.length; i++) {
    var claim = claims[i]
    hashes.push(claim.H)
  }
  return hashes
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

function relate(base, link, tag) {
  var rel = {Links: [{Base: base, Link: link, Tag: tag}]}
  return commit('relation', JSON.stringify(rel))
}
