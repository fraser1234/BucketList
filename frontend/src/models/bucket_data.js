const Request = require('../services/request.js');

const BucketData = function(url){
  this.url = url;
  this.onLoad = null;
}

BucketData.prototype.getData = function(){
  const request = new Request(this.url);
  request.get(this.onLoad);
}

module.exports = BucketData;
