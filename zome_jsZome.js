
// expose("get",HC.STRING);
// function getProperty(x) {return property(x)};

expose("claim", HC.JSON);
function claim(x) {return commit("trust_atom", x);}

function validate(entry_type,entry,props) {
 return true
}

function genesis() {return true}