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
    .controller('sectionRegisterUserCtrl', ['$scope', '$http', 'transformRequestAsFormPost', function($scope, $http, transformRequestAsFormPost) {

        //A scope variable to hold the form data
        $scope.modelRegisterUserForm = {
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
            valid: true,
            success:false
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
        $scope.fn_register_user = function(modelRegisterUserForm) {
            $http({
                method: 'POST',
                url: '/api/register_user',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'id': modelRegisterUserForm,
                    'first_name': modelRegisterUserForm.first_name,
                    'last_name': modelRegisterUserForm.last_name,
                    'email': modelRegisterUserForm.email,
                    'password': modelRegisterUserForm.password,
                    'city': modelRegisterUserForm.city,
                    'mobile': modelRegisterUserForm.mobile,
                    'alternate_mobile': modelRegisterUserForm.alternate_mobile,
                    'usertype': modelRegisterUserForm.usertype
                }
            }).then(function(data){
                if(data.data.id){
                    modelRegisterUserForm.success = true;
                }
            });
        };

        $scope.getUserTypes();
    }]);
