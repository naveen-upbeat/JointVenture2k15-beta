/**
 * @ngdoc controller
 * @name submodules.modallogin:modalLoginController
 * @scope
 * @restrict AE
 *
 * @description
 * The controller used for validating the login controls
 * and for authenticating using AJAX
 *
 */
angular.module('submodules.modallogin')
    .controller('modalLoginController', ['$scope', '$http', 'transformRequestAsFormPost', function($scope, $http, transformRequestAsFormPost) {

        //A scope variable to hold the form data
        $scope.user = {
            usernamemodel: '',
            passwordmodel: '',
            valid: true
        };

        // Storing a copy, and using it to reset the scope on clicking 'Cancel' button
        $scope.origUserCopy = angular.copy($scope.user);

        // A resetForm function, to handle the Cancel button click
        $scope.resetForm = function() {
            $scope.user = angular.copy($scope.origUserCopy);
        };

        // A loginUser function, to handle the User Login
        $scope.loginUser = function(userModel) {

            $http({
                method: 'POST',
                url: '/api/logincheck',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'username': userModel.usernamemodel,
                    'password': userModel.password
                }
            }).success(function(data, status, headers, cfg) {
                if (data.length > 0) {
                    userModel.valid = true;
                } else {
                    userModel.valid = false;
                }
            }).error(function(data, status, headers, cfg) {
                userModel.valid = false;
            });
        };
    }]);
