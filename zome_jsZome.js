expose('claim', HC.JSON)
function claim(params) {
  var claimId = commit('trust_atom', params.atom)
  debug(JSON.stringify(params, null, 2))
  debug(JSON.stringify(params))
  put(claimId)

  entity(claimId, params.creator)
  entity(claimId, params.target)

  if (params.tags) {
    for(var i = 0; i < params.tags.length; i++) {
      var tag = params.tags[i]
      entity(claimId, tag)
    }
  }

  return claimId
}

function entity(claimId, entity) {
  entityId = commit('entity', entity)
  // debug(entityId)
  // debug('PUTTING: '+ entityId +', '+ entity)
  put(entityId)
  // debug('PUTTED')
  putmeta(entityId, claimId, 'claim')  // sub, obj, pred
  return entityId
}

expose('get', HC.JSON)
function get(params) {
  // debug("GETTING")
  // debug(JSON.stringify(params, null, 2))
  var targetId = commit('entity', params.target)
  console.log(targetId)
  // targetId = hash(params.target)
  var claims = getmeta(targetId, 'claim')
  debug("RESULT: " + JSON.stringify(claims, null, 4))
  return claims
}

function validate(entry_type, entry, props) {
  return true
}

function genesis() {
  // var holochainId = property("_id")
  // targets = commit('entity', 'targets')  ; put(targets)
  // putmeta(holochainId, targets, 'targets')
  return true
}
