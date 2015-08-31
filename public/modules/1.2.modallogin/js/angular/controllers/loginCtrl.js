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
    .controller('modalLoginCtrl', ['$scope', '$http', 'transformRequestAsFormPost', 'userLoginSvc', function($scope, $http, transformRequestAsFormPost, userLoginSvc) {

        //A scope variable to hold the form data
        $scope.modelLoginForm = {
            username: '',
            password: '',
            str_modal_header: 'login',
            modal_header_options: {
                'login': 'Login',
                'forgotpassword': 'Forgot Password'
            },
            is_valid: true,
            fn_getModalHeaderText : function(){
                return this.modal_header_options[this.str_modal_header];
            },
            fn_resetModel: function(){
                this.username = '';
                this.password = '';
            }
        };

        // Storing a copy, and using it to reset the scope on clicking 'Cancel' button
        $scope.origUserCopy = angular.copy($scope.modelLoginForm);

        // A resetForm function, to handle the Cancel button click
        $scope.fn_resetForm = function() {
            $scope.modelLoginForm = angular.copy($scope.origUserCopy);
        };

        // A loginUser function, to handle the User Login
        $scope.fn_loginUser = function(userModel) {
            if (userModel.username === '' || userModel.password === '') {
                userModel.is_valid = false;
                $scope.loginForm.username.$setDirty();
                $scope.loginForm.password.$setDirty();
            }
            if (userModel.is_valid || $scope.loginForm.$valid) {
                userLoginSvc.validateUser(userModel.username, userModel.password)
                    .success(function(data, status, headers, cfg) {
                        if (data.length > 0) {
                            userModel.is_valid = true;
                            userLoginSvc.setUserSessionData(angular.fromJson(data[0]));
                        } else {
                            userModel.is_valid = false;
                        }
                    }).error(function(data, status, headers, cfg) {
                        userModel.is_valid = false;
                    });
            }
        };

        $scope.fn_resetPassword = function() {

        };

    }]);