var redis   = require('redis');
var Promise = require('bluebird');

exports = module.exports = Set;

exports.create = function(name, client) {
  if (arguments.length == 0) {
    throw new Error("Expected a name.");
  }
  return new Set(name, client);
}

function Set(name, client) {
  if (arguments.length == 0) {
    throw new Error("Expected a name.");
  }

  this.name = name;
  this.client = client || redis.createClient();
}

Set.prototype.add = function(value) {

  if (!value) {
    throw new Error(".add() expected a value.");
  }

  return new Promise(function(resolve, reject) {
    this.client.sadd(this.name, value, function(err, result) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  }.bind(this));
};

Set.prototype.list = function() {

  return new Promise(function(resolve, reject) {
    this.client.smembers(this.name, function(err, list) {
      if (err) {
        return reject(err);
      }

      resolve(list);
    });
  }.bind(this));
};

Set.prototype.member = function(value) {
  if (!value) {
    throw new Error("Expected a value.");
  }

  return new Promise(function(resolve, reject) {
    this.client.sismember(this.name, value, function(err, result) {
      if (err) {
        return reject(err);
      }

      if (result == 1) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }.bind(this));
}

Set.prototype.remove = function(value) {
  if (!value) {
    throw new Error("Expected a value.");
  }

  return new Promise(function(resolve, reject) {
    this.client.srem(this.name, value, function(err, result) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  }.bind(this));
};