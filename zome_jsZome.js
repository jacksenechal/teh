function entity(claimId, entity) {
  entityId = commit('entity', entity)
  debug(entityId)
  debug('PUTTING: '+ entityId +', '+ entity)
  put(entityId)
  debug('PUTTED')
  putmeta(entityId, claimId, 'claim')  // sub, obj, pred
  return entityId
}

expose('claim', HC.JSON)
function claim(params) {
  var claimId = commit('trust_atom', params.atom)
  debug(JSON.stringify(params, null, 2))
  put(claimId)

  entity(claimId, params.creator)
  entity(claimId, params.target)

  if (params.tags) {
    for(var i = 0; i < params.tags.length; i++) {
      var tag = params.tags[i]
      entity(claimId, tag)
    }
  }

  // // putmeta(claimId, targets, params.target )
  return claimId
}

expose('get', HC.JSON)
function get(params) {
  debug("GETTING")
  debug(JSON.stringify(params, null, 2))
  var targetId = commit('entity', params.target)
  debug('111111')
  console.log(targetId)
  // targetId = hash(params.target)
  var claims = getmeta(targetId, 'claim')
  debug('222222')
  debug("RESULT: " + claims)
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
