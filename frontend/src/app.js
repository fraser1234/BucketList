const BucketData = require('./models/bucket_data');
const bucketData = new BucketData();

const app = function(){
  const bucketData = new BucketData();
  const bucketView = new BucketView(document.querySelector("selected-countries"));
  bucketData.onLoad = bucketView.render();
  bucketData.getData();
}
document.addEventListener("onload", app)
