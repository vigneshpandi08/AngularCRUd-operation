app.service("SPACRUDService", function ($http) {

    this.getcityLists = function () {
        return $http.get("/api/CityListAPI");
    };

    this.getQualifications = function () {
        return $http.get("/api/QualificationInfoAPI");
    };
    
    this.getHobbies = function () {
        return $http.get("/api/HobbyInfoAPI");
    };

    this.getRoles = function () {
        return $http.get("/api/RoleInfoAPI");
    };

    //Read all Students  
    this.getStudents = function () {
        return $http.get("/api/StudentInfoAPI");
    };

    //Fundction to Read Student by Student ID  
    this.getStudent = function (id) {
        return $http.get("/api/StudentInfoAPI/" + id);
    };

    //Function to create new Student  
    this.post = function (Student) {
        var request = $http({
            method: "post",
            url: "/api/StudentInfoAPI",
            data: Student
        });
        return request;
    };

    //Edit Student By ID   
    this.put = function (id, Student) {
        var request = $http({
            method: "put",
            url: "/api/StudentInfoAPI/" + id,
            data: Student
        });
        return request;
    };

    //Delete Student By Student ID  
    this.delete = function (id) {
        var request = $http({
            method: "delete",
            url: "/api/StudentInfoAPI/" + id
        });
        return request;
    };
});  