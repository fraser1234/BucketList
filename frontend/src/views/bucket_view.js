var BucketView = function(){
  this.buckets = [];
}

BucketView.prototype.addBucket = function(country) {
  this.buckets.push(country);
  this.render(country);
  // console.log(country);
}

BucketView.prototype.clear = function(country) {
  this.buckets = [];
  const ul = document.querySelector('#selected-countries');
  ul.innerHTML = '';
}

BucketView.prototype.render = function(country){
    const ul = document.querySelector('#selected-countries');
    // console.log(country);
    for(var country in buckets){
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${country.name}`;
    li.appendChild(text);
    ul.appendChild(li);
  };
};

 module.exports = BucketView;
