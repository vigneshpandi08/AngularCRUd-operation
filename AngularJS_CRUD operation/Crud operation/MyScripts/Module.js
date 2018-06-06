var app = angular.module("ApplicationModule", ['ngRoute', 'ngTagsInput', 'ngSanitize', 'ui.select']);

app.factory("ShareData", function () {
    return { value: 0 }
});

//Showing Routing  
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    debugger;
    $routeProvider.when('/showstudents',
        {
            templateUrl: 'Student/ShowAllstudent',//Controller/View
            controller: 'ShowStudentsController'//js
        });
    $routeProvider.when('/addstudent',
        {
            templateUrl: 'Student/AddStudent',
            controller: 'AddStudentController'
        });
    $routeProvider.when("/editStudent",
        {
            templateUrl: 'Student/EditStudent',
            controller: 'EditStudentController'
        });
    $routeProvider.when('/deleteStudent',
        {
            templateUrl: 'Student/DeleteStudent',
            controller: 'DeleteStudentController'
        });
    $routeProvider.otherwise(
        {
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true).hashPrefix('!')
}]); 