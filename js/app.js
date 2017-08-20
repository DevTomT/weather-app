var weatherApp = angular.module("weatherApp", []);

let cities = ["warsaw", "berlin", "prague", "budapest", "kiev", "minsk", "moscow"];
let citiesWoeid = [523920, 638242, 796597, 804365, 924938, 834463, 2122265];

// Create controllers for each city from cities array.
// Get data from URL.
for (let i = 0; i < cities.length; i++) {
   let city = cities[i];
   weatherApp.controller(city + "Ctrl", function ($scope, $http) {
      $http.get("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + citiesWoeid[i] + "/")
         .then(function success(response) {
            $scope.weather = response.data;
            $scope.minTemp = ($scope.weather.consolidated_weather[0].min_temp).toFixed(0);
            $scope.maxTemp = ($scope.weather.consolidated_weather[0].max_temp).toFixed(0);
            $scope.src = "https://www.metaweather.com/static/img/weather/png/64/" + $scope.weather.consolidated_weather[0].weather_state_abbr + ".png";
            $scope.pressure = ($scope.weather.consolidated_weather[0].air_pressure).toFixed(0);
         }, function err(response) {
            $scope.weather = "Something goes wrong";
            console.log($scope.weather);
         });
   });
}

// Main Controller
weatherApp.controller("mainCtrl", function ($scope, $http) {

   // Show full weather when button "More" is clicked
   $scope.showCity = function (x) {
      $http.get("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + x.woeid + "/")
         .then(function success(response) {
            $scope.weather = response.data;
         }, function err(response) {
            $scope.weather = "Something goes wrong";
            console.log($scope.weather);
         });
   }

   $scope.cities = [];
   $scope.errText = "";

   // Add new city.
   // Get data from URL.
   $scope.addCity = function () {
      for (let i = 0; i < $scope.cities.length; i++) {
         if ($scope.cities[i].title.toLowerCase() == $scope.newCity.toLowerCase()) {
            $scope.errText = "This city is already on the application list. Please choose another one.";
            return;
         }
      }
      if (!$scope.newCity) {
         return;
      }

      if ($scope.cities.indexOf($scope.newCity) == -1) {
         $http.get("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" + $scope.newCity.toLowerCase())
            .then(function success(response) {
                  if (response.data[0] == undefined) {
                     $scope.errText = "Sorry, this city is not available in this application.";
                     return;
                  } else if (response.data.length > 1) {
                     $scope.errText = "Found more than one result. Please enter a more precise name.";
                     return;
                  }
                  $http.get("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + response.data[0].woeid + "/")
                     .then(function success(response) {
                        $scope.weather = response.data;
                        $scope.cities.push($scope.weather);
                     }, function err(response) {
                        $scope.weather = "Something goes wrong";
                        console.log($scope.weather);
                     });
               },
               function err(response) {
                  $scope.weather = "Something goes wrong";
                  console.log($scope.weather);
               });
      }
   }

   // Remove city
   $scope.removeCity = function (x) {
      $scope.cities.splice(x, 1);
   }

   // Hide errText
   $scope.hideErrText = function () {
      $scope.errText = "";
   }

});
