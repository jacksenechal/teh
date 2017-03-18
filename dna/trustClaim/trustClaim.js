expose('claim', HC.JSON)
function claim(params) {
  var claimId = putClaim(params);

  putClaimMetadata({claimId: claimId, entity: params.creator})
  putClaimMetadata({claimId: claimId, entity: params.target})

  if (params.tags) {
    for(var i = 0; i < params.tags.length; i++) {
      var tag = params.tags[i]
      putClaimMetadata({claimId: claimId, entity: tag})
    }
  }

  return claimId
}

expose('putClaim', HC.JSON)
function putClaim(params) {
  var claimId = commit('trust_atom', params.atom)
  put(claimId)
  return claimId;
}

expose('putClaimMetadata', HC.JSON)
function putClaimMetadata(args) {
  claimId = args.claimId
  entity = args.entity
  entityId = commit('entity', entity)
  put(entityId)
  putmeta(entityId, claimId, 'claim')  // sub, obj, pred
  return entityId
}

expose('get', HC.JSON)
function get(params) {
  var targetId = commit('entity', params.target)
  console.log(targetId)
  var result = getmeta(targetId, 'claim')
  debug("RESULT: " + JSON.stringify(result, null, 4))
  if (result.name === "HolochainError") {
    if (result.message === "hash not found") {
      return []
    } else {
      throw(result)
    }
  } else {
    return result.Entries
  }
}

expose('getHashes', HC.JSON)
function getHashes(params) {
  var claims = get(params)
  var hashes = []
  for(var i = 0; i < claims.length; i++) {
    var claim = claims[i]
    hashes.push(claim.H)
  }
  return hashes
}

function validate(entry_type, entry, props) {
  return true
}

function genesis() {
  return true
}
