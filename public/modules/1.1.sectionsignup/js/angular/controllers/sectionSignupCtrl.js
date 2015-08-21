/**
 * @ngdoc controller
 * @name submodules.sectionsignup:sectionSignupCtrl
 * @scope
 * 
 * @description
 * The controller used for validating the signup controls
 * and for creating user using AJAX
 *
 */
angular.module('submodules.sectionsignup')
    .controller('sectionSignupCtrl', ['$scope', '$http', 'transformRequestAsFormPost', function($scope, $http, transformRequestAsFormPost) {

        //A scope variable to hold the form data
        $scope.signupUser = {
            emailmodel: 'sample',
            valid: true
        };

        $scope.$watch('signupUser',function(newVal, oldVal){
            if(newVal.emailmodel !== oldVal.emailmodel){
                $scope.checkUserExists(newVal);        
            }
        },true);

        $scope.usertypes = {

        };


        // Storing a copy, and using it to reset the scope on clicking 'Cancel' button
        $scope.origUserCopy = angular.copy($scope.user);

        // A resetForm function, to handle the Cancel button click
        $scope.resetForm = function() {
            $scope.user = angular.copy($scope.origUserCopy);
        };

        // A loginUser function, to handle the User Login
        $scope.checkUserExists = function(signupUser) {
            $http({
                method: 'GET',
                url: '/api/checkemailid',
                params: {
                    'email': signupUser.emailmodel
                }
            }).success(function(data, status, headers, cfg) {
                if (data.length > 0) {
                    signupUser.valid = false;
                } else {
                    signupUser.valid = true;
                }
            }).error(function(data, status, headers, cfg) {
                signupUser.valid = false;
            });
        };

        // A getUserTypes function, to get all the user types
        $scope.getUserTypes = function(userModel) {
            $http({
                method: 'GET',
                url: '/api/getusertypes'            
            }).success(function(data, status, headers, cfg) {
                if (data.length > 0) {
                    $scope.usertypes = data;
                }
            }).error(function(data, status, headers, cfg) {
                
            });
        };

        $scope.getUserTypes();
    }]);
