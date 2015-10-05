/**
 * @ngdoc controller
 * @name submodules.sectionrent:sectionRentPropertyCtrl
 * @scope
 * 
 * @description
 * The controller used for validating the rent property
 *
 */
angular.module('submodules.sectionrent')
    .controller('sectionRentPropertyCtrl', ['$scope', '$http', 'transformRequestAsFormPost', function($scope, $http, transformRequestAsFormPost) {

        //A scope variable to hold the form data
        $scope.modelRentPropertyForm = {
            usertype: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: '',
            show_password: '',
            mobile: '',
            alternate_mobile: '',
            city: '',
            captcha_valid: false,
            valid: true
        };

        $scope.usertypes = {

        };


        // Storing a copy, and using it to reset the scope on clicking 'Cancel' button
        $scope.origUserCopy = angular.copy($scope.user);

        // A resetForm function, to handle the Cancel button click
        $scope.resetForm = function() {
            $scope.user = angular.copy($scope.origUserCopy);
        };

        // A loginUser function, to handle the User Login
        $scope.checkUserExists = function(email) {
            return $http({
                method: 'GET',
                url: '/api/check_email_exists',
                params: {
                    'email': email
                }
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

        // Register User
        $scope.fn_rent_property = function(modelRentPropertyForm) {
            return $http({
                method: 'POST',
                url: '/api/register_user',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'id': modelRentPropertyForm,
                    'first_name': modelRentPropertyForm.first_name,
                    'last_name': modelRentPropertyForm.last_name,
                    'email': modelRentPropertyForm.email,
                    'password': modelRentPropertyForm.password,
                    'city': modelRentPropertyForm.city,
                    'mobile': modelRentPropertyForm.mobile,
                    'alternate_mobile': modelRentPropertyForm.alternate_mobile,
                    'usertype': modelRentPropertyForm.usertype
                }
            });
        };

        $scope.getUserTypes();
    }]);
