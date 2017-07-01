var records = [
    { id: 1, username: 'pedro', password: '123', displayName: 'PedroMatos', emails: [ { value: 'pedromatos@outlook.pt' } ] }
  , { id: 2, username: 'paulo', password: '123', displayName: 'teste', emails: [ { value: 'teste@example.com' } ] }
  , { id: 3, username: 'vasco', password: '123', displayName: 'teste', emails: [ { value: 'teste@example.com' } ] }
  , { id: 4, username: 'grupo1', password: '123', displayName: 'grupo1', emails: [ { value: 'grupo1@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
