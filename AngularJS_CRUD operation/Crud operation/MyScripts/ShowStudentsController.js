app.controller('ShowStudentsController', function ($scope, $location, SPACRUDService, ShareData) {
    debugger;
    loadAllStudentsRecords();

    function loadAllStudentsRecords() {
        debugger;

        var promiseGetStudent = SPACRUDService.getStudents();
       
        promiseGetStudent.then(function (pl) {
            debugger;
            $scope.students = pl.data
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }

    //To Edit Student Information  
    $scope.editStudent = function (StudentID) {
        debugger;
        ShareData.value = StudentID;
        $location.path("/editStudent");
    }

    //To Delete a Student  
    $scope.deleteStudent = function (StudentID) {
        ShareData.value = StudentID;
        $location.path("/deleteStudent");
    }
}); 