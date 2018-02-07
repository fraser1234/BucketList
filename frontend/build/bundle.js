/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const BucketData = __webpack_require__(1);
const BucketView  =__webpack_require__(3);
const bucketData = new BucketData();

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var formDropdown = function(countries){
 var select = document.querySelector('#bucket-list')
 var optionAtTop = document.createElement('option');
 optionAtTop.innerText = "Select a country";
 optionAtTop.disabled = true;
 optionAtTop.selected = true;
 select.appendChild(optionAtTop);
 countries.forEach(function(country, index){
   var option = document.createElement('option');
   option.innerText = country.name;
   option.value = index;
   select.appendChild(option);
 })
}

var requestComplete = function(){
 if (this.status !== 200) {return;}
 var jsonString = this.responseText;
 var countries = JSON.parse(jsonString);

 var jsonStringCountries = JSON.stringify(countries);
 localStorage.setItem('Countries array', jsonStringCountries);

 formDropdown(countries);
};

var populateDropdown = function(){
 var url = "https://restcountries.eu/rest/v2";
 makeRequest(url, requestComplete);
}

var handleOptionSelected = function(country){
 var pTag = document.querySelector('#select-result');
 var jsonStringCountries = localStorage.getItem('Countries array');
 var countries = JSON.parse(jsonStringCountries);
 var country = countries[this.value];
 var jsonString = JSON.stringify(country);

 localStorage.setItem('Last selected country', jsonString);

 pTag.innerText = `Country: ${country.name} \n Population: ${country.population} \n Capital: ${country.capital}`;
 borderArrayCountries = (convertCodeToCountry(country.borders))

 var ul = document.querySelector('#border-list')
 ul.innerHTML = "";
 borderArrayCountries.forEach(function(country){
   var li = document.createElement('li');
   li.innerText = `${country.name}, ${country.capital}`;
   ul.appendChild(li);
 })

}

var convertCodeToCountry = function(codesArray){
 var jsonStringCountries = localStorage.getItem('Countries array');
 var countries = JSON.parse(jsonStringCountries);
 var filteredCountries = countries.filter(country => codesArray.indexOf(country.alpha3Code) != -1);
 return filteredCountries;
};

const app = function(){

  const bucketData = new BucketData('http://localhost:5000/api/bucket_list');
  const bucketView = new BucketView(document.querySelector("selected-countries"));
  bucketData.onLoad = bucketView.render;
  bucketData.getData();

  populateDropdown();

  var select = document.querySelector('#bucket-list');
  select.addEventListener('change', handleOptionSelected);
};

document.addEventListener("DOMContentLoaded", app);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(2);

const BucketData = function(url){
  this.url = url;
  this.onLoad = null;
}

BucketData.prototype.getData = function(){
  console.log(this.url);
  const request = new Request(this.url);
  request.get(this.onLoad);
}

module.exports = BucketData;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if(this.status!==200) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
  request.send();
}

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status!==201) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
  request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status!==204) {
      return;
    }

    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

BucketView.prototype.render = function(countries){
  console.log(countries);
    const ul = document.querySelector('#selected-countries');
    // console.log(country);
    for(var country of countries){
    
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${country.country}`;
    li.appendChild(text);
    ul.appendChild(li);
  };
};

 module.exports = BucketView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map