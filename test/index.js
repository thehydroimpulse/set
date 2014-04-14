var Set = require('..');
var assert = require('assert');
var Promise = require('bluebird');

describe('set', function() {

  it('should export a function', function() {
    assert.equal('function', typeof Set);
  });

  it('should expose a .create method', function() {
    assert.equal('function', typeof Set.create);
  });

  it('should create a new Set instance', function() {
    assert(Set.create('foo') instanceof Set);
  });

  it('should throw without an argument', function() {
    assert.throws(function() {
      Set.create();
    });
  });

  it('should have an .add method', function() {
    assert.equal('function', typeof Set.prototype.add);
  });

  it('should return a new promise', function() {
    assert(Set.create('boo').add('woot') instanceof Promise);
  });

  it('should throw an error without a value', function() {
    assert.throws(function() {
      Set.create('foo').add();
    }, Error);
  });

  it('should have a .list() method', function() {
    assert.equal('function', typeof Set.prototype.list);
  });

  it('should return a promise', function() {
    assert(Set.create('foo').list() instanceof Promise);
  });

  it('should add an item', function(done) {
    var set = Set.create('something');

    set.add('value1').then(function() {
      set.client.sismember('something', 'value1', function(err, result) {
        if (err) return done(err);

        assert.equal(result, 1);
        done();
      });
    });
  });

  it('should return an empty set', function(done) {
    var set = Set.create('xx');

    set.list().then(function(list) {
      assert.equal(list.length, 0);
      done();
    });
  });

  it('should add a value and list that value', function(done) {
    var set = Set.create('woot');

    set.add('value3').then(function() {
      return set.list();
    }).then(function(list) {
      assert.equal(list.length, 1);
      done();
    });
  });

  it('should have a .member() method', function() {
    assert.equal('function', typeof Set.prototype.member);
  });


  it('should have a .remove() method', function() {
    assert.equal('function', typeof Set.prototype.remove);
  });


  it('should (.remove()) return a promise', function() {
    assert(Set.create('123').remove('foobar') instanceof Promise);
  });

  it('should (.member()) return a promise', function() {
    assert(Set.create('s').member('foobar') instanceof Promise);
  });

  it('should add an element and test positive for membership', function(done) {
    var set = Set.create('hellothere');

    set.add('foobar').then(function() {
      return set.member('foobar');
    }).then(function(isMember) {
      assert.equal(isMember, true);
      done();
    });
  });

  it('should (.remove()) throw without a value', function() {
    assert.throws(function() {
      Set.create('foooo').remove();
    }, Error);
  });

  it('should (.member()) throw without a value', function() {
    assert.throws(function() {
      Set.create('foooo').member();
    }, Error);
  });

  it('should add an element and then remove it, finally testing membership', function(done) {
    var set = Set.create('wonderful');

    set.add('woot123').then(function() {
      return set.remove('woot123');
    }).then(function() {
      return set.member('woot123');
    }).then(function(isMember) {
      assert.equal(isMember, false);
      done();
    });
  });

});