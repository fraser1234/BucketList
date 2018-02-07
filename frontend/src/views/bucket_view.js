var BucketView = function(){
  this.buckets = [];
}

BucketView.prototype.addBucket = function(country) {
  this.buckets.push(country);
  this.render(country);
}

BucketView.prototype.clear = function(country) {
  this.buckets = [];
  const ul = document.querySelector('#selected-countries');
  ul.innerHTML = '';
}

BucketView.prototype.render = function(country){
    const ul = document.querySelector('#selected-countries');
    const li = document.createElement('li');
    const text = document.createElement('p');
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = BucketView;
