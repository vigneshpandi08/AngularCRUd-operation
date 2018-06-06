var app = angular.module('Myapp', ['ngTagsInput']);

app.controller('MainCtrl', function ($scope, $http) {
    $scope.tag = [
     { text: 'Tag1' },
     { text: 'Tag2' },
     { text: 'Tag3' }
    ];

    $scope.tags = [
   { name: "Brazil", flag: "Brazil.png" },
   { name: "Italy", flag: "Italy.png" },
   { name: "Spain", flag: "Spain.png" },
   { name: "Germany", flag: "Germany.png" },
    ];

    $scope.loadCountries = function ($query) {
        return $http.get('countries.json', { cache: true }).then(function (response) {
            var countries = response.data;
            return countries.filter(function (country) {
                return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        });
    };

    $scope.name = [
      { text: 'vicky' },
      { text: 'bala' },
      { text: 'venkat' }
    ];
    $scope.log = [];

    $scope.loadNames = function (query) {
        return $http.get('name.json');
    };
    //});
    //app.service('name', function ($q) {
    //    var name = [
    //        { "text": "Bala" },
    //        { "text": "Subash" },
    //        { "text": "Praveen" },
    //        { "text": "vignesh" },
    //        { "text": "sethu" },
    //        { "text": "manoj" },
    //        { "text": "mani" },
    //        { "text": "prasanth" },
    //        { "text": "divya" },
    //        { "text": "priya" }
    //    ];

    //    this.load = function () {
    //        var deferred = $q.defer();
    //        deferred.resolve(name);
    //        return deferred.promise;
    //    };
    $scope.tagRemoved = function (tag) {
        $scope.log.push('Removed: ' + tag.text);
    };
});
