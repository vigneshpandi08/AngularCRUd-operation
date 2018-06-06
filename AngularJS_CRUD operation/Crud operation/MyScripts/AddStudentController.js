app.controller('AddStudentController', function ($scope, $http, $window, $location, SPACRUDService, ShareData, $timeout, $interval) {
    //$scope.Id = 0;

    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue', 'Red'];
    $scope.multipleDemo.colors2 = ['Black', 'White'];

    $scope.tags = [
    { text: 'vignesh' },
     { text: 'bala' },
      { text: 'subash' }
    ];
    $scope.log = [];

    $scope.firstLetterGroupFn = function (item) {
        return item.name[0];
    };

    //$scope.reverseOrderFilterFn = function (groups) {
    //    return groups.reverse();
    //};

    $scope.OrderFilterFn = function (groups) {
        return groups;
    };
    $scope.disabled = undefined;
    $scope.disable = function () {
        $scope.disabled = true;
    };

    $scope.country = {};
    $scope.countries = [ 
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Australia', code: 'AU' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Canada', code: 'CA' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'Zimbabwe', code: 'ZW' }
    ];

    // $scope.tags = [
    //{ name: "Brazil", flag: "Brazil.png" },
    //{ name: "Italy", flag: "Italy.png" },
    //{ name: "Spain", flag: "Spain.png" },
    //{ name: "Germany", flag: "Germany.png" },
    // ];

    $scope.loadNames = function (query) {
         return $http.get('/MyJs/name.json', { cache: true }).then(function (response) {
             var countries = response.data;
             return countries.filter(function (country) {
                 return country.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
             });
         });
     };


    //$scope.loadNames = function (query) {
    //    return $http.get('/MyJs/name.json');
    //};


     $scope.tagRemoved = function (tag) {
         $scope.log.push('Removed: ' + tag.text);
     };



    debugger;
    loadAllCityListsRecords();

    function loadAllCityListsRecords() {
        alert('Welcome');

        var promiseGetCityList = SPACRUDService.getcityLists();

        promiseGetCityList.then(function (response) {
            $scope.CityLists = response.data
            console.log($scope.CityLists);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }
    loadAllQualificationsRecords();

    function loadAllQualificationsRecords() {

        var promiseGetQualification = SPACRUDService.getQualifications();

        promiseGetQualification.then(function (response) {
            $scope.qualifications = response.data
            console.log($scope.qualifications);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }

    loadAllRolesRecords();

    function loadAllRolesRecords() {
        debugger;

        var promiseGetRole = SPACRUDService.getRoles();

        promiseGetRole.then(function (response) {
            debugger;
            $scope.roles = response.data
            console.log($scope.roles);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }

   

    $scope.save = function () {
        debugger;
        var optionsCSV = '';
        $scope.roles.forEach(function (r) {
            if (r.id = r.Selected) {
                if (optionsCSV) {
                    optionsCSV += ','
                }
                optionsCSV += r.name;
                $scope.Role = optionsCSV;
            }
        })

        //var optionsV = '';
        //$scope.countries.forEach(function (country) {
        //    if (optionsCSV) {
        //        optionsCSV += ','
        //    }
        //    optionsV += country.name;
        //    $scope.Country = optionsV;

        //})

  
        var Student = {
            Name: $scope.Name,
            City: $scope.City,
            DOB: $scope.DOB,
            Gender: $scope.Gender,
            Mark: $scope.Mark,
            MobileNo: $scope.MobileNo.toString(),
            Role: $scope.Role,
            Tag: $scope.Tag.toString(),
            Color: $scope.multipleDemo.colors.toString(),
            Color2: $scope.multipleDemo.colors2.toString(),
            Country: $scope.country.selected.name,
            Qualification: $scope.Qualification.toString()
        };
        var promisePost = SPACRUDService.post(Student);

        promisePost.then(function (pl) {
            debugger;
            alert("Student Saved Successfully.");
        },
            function (errorPl) {
                $scope.error = 'failure loading Student', errorPl;
                alert("some error occured");
            });

    };

});
