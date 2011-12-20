var should = require('should')
  , nock = require('nock')
  , gist = require('../lib/gist');

describe('integration', function() {

  it('should create gist and return the gist url', function(done) {
    gist.create('teste new gist', function (url) {
      url.should.match(/^http:\/\/gist\.github\.com\/\d+$/)
      done();
    });
  });

});
