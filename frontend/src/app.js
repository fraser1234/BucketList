const BucketData = require('./models/bucket_data.js');
const BucketView  =require('./views/bucket_view.js');
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
