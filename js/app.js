var weatherApp = angular.module("weatherApp", []);

let cities = ["warsaw", "berlin", "prague", "budapest", "kiev", "minsk", "moscow"];

// Create controllers for each city from cities array.
// Get data from json files.
for (let i = 0; i < cities.length; i++) {
   let city = cities[i];
   weatherApp.controller(city + "Ctrl", function ($scope, $http) {
      $http.get("json/" + city + ".json")
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
      console.log(x.title);
      $http.get("json/" + x.title.toLowerCase() + ".json")
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
   // Get data from json file.
   $scope.addCity = function () {
      for (let i = 0; i < $scope.cities.length; i++) {
         if ($scope.cities[i].title == $scope.newCity) {
            $scope.errText = "This city is already on the application list. Please choose another one.";
            return;
         }
      }
      if (!$scope.newCity) {
         return;
      }
      if ($scope.cities.indexOf($scope.newCity) == -1) {
         $http.get("json/" + $scope.newCity.toLowerCase() + ".json")
            .then(function success(response) {
               $scope.weather = response.data;
               $scope.cities.push($scope.weather);
            }, function err(response) {
               $scope.weather = "Something goes wrong";
               console.log($scope.weather);
            });
      } else {
         $scope.errText = "This city is already on the application list. Please choose another one.";
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
