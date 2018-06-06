app.controller("EditStudentController", function ($scope, $http, $location, ShareData, SPACRUDService) {

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

    $scope.loadNames = function (query) {
        return $http.get('/MyJs/name.json', { cache: true }).then(function (response) {
            var countries = response.data;
            return countries.filter(function (country) {
                return country.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
        });
    };

    $scope.tagRemoved = function (tag) {
        $scope.log.push('Removed: ' + tag.text);
    };


    debugger;
    loadAllCityListsRecords();

    function loadAllCityListsRecords() {
        alert('Welcome to edit');

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

    //loadAllHobbiesRecords();

    //function loadAllHobbiesRecords() {

    //    var promiseGetHobby = SPACRUDService.getHobbies();

    //    promiseGetHobby.then(function (response) {
    //        $scope.hobbies = response.data
    //        console.log($scope.hobbies);
    //    },
    //        function (errorPl) {
    //            debugger;
    //            $scope.error = errorPl;
    //        });
    //}

    loadAllRolesRecords();

    function loadAllRolesRecords() {
        debugger;

        var promiseGetRole = SPACRUDService.getRoles();

        promiseGetRole.then(function (response) {
            debugger;
            $scope.roles = response.data;
            $scope.roles.forEach(function (r) {
                if (ShareData.value.name != undefined && ShareData.value.name != null) {
                    var roleSeletced = ShareData.value.name.split(',');
                    for (var i = 0; i < roleSeletced.length; i++) {
                        if (roleSeletced[i] == r.name) {
                            r.Selected = true;
                        }
                    }
                }
            })
            console.log($scope.roles);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }


    function getStudent() {
        debugger;
        var promiseGetStudent = SPACRUDService.getStudent(ShareData.value);

        promiseGetStudent.then(function (pl) {
            $scope.Student = pl.data;
            //$scope.Student.city = "3";
        },
            function (errorPl) {
                $scope.error = 'failure loading Student', errorPl;
            });
    }

    getStudent();

    //$scope.checkAll = function () {
    //    if ($scope.Student.selectedAll) {
    //        $scope.Student.selectedAll = true;
    //    } else {
    //        $scope.Student.selectedAll = false;
    //    }
    //    angular.forEach($scope.roles, function (r) {
    //        r.Selected = $scope.Student.selectedAll;
    //    });

    //};

    $scope.save = function () {
        debugger;
        var optionsCSV = '';
        $scope.roles.forEach(function (r) {
            if (r.id = r.Selected) {
                               
                if (optionsCSV) {
                    optionsCSV += ','
                }
                optionsCSV += r.name;
                $scope.Student.role = optionsCSV;
            }
        })
       
       
        var Student = {
            StudentID: $scope.Student.studentID,
            Name: $scope.Student.name,
            City: $scope.Student.city,
            DOB: $scope.Student.dob,
            Gender: $scope.Student.gender,
            Mark: $scope.Student.mark,
            MobileNo: $scope.Student.mobileNo,
            Resume: $scope.Student.resume,
            Role: $scope.Student.role,
            Tag: $scope.Student.Tag.toString(),
            Color: $scope.multipleDemo.colors.toString(),
            Color2: $scope.multipleDemo.colors2.toString(),
            Country: $scope.country.selected.name,
            Qualification: $scope.Student.qualification.toString()
        };

        var promisePutStudent = SPACRUDService.put($scope.Student.studentID, Student);
        promisePutStudent.then(function (pl) {
            alert("Saved Successfully.");
            $location.path("/showstudents");
        },
            function (errorPl) {
                $scope.error = 'failure loading Student', errorPl;
            });
    };

});  