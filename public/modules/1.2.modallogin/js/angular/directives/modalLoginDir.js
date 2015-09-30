/**
 * @ngdoc directive
 * @name submodules.modallogin:appJvModalLogin
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for singin in modal, loads the related template
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.modallogin')
    .directive('appJvModalLogin', function(userLoginSvc, $mdDialog, $mdMedia) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-modal-login.html',
            replace: true,
            link: function(scope, element) {

                scope.$watch(function() {
                    return userLoginSvc.getUserSessionData();
                }, function(newVal, oldVal) {
                    if (newVal && (newVal.bln_logged_in)) {
                        $mdDialog.hide();
                        scope.modelLoginForm.fn_resetModel();
                    }
                }, true);

                scope.modalLoginTabs = {
                    'tabs': [{
                        'title': 'Login'

                    }, {
                        'title': 'Forgot Password'
                    }],
                    'active_tab_index': '1'
                };

                scope.fn_close = function() {
                    $mdDialog.cancel();
                };
                
                scope.fn_login = function() {
                    setTimeout(function(){
                        $('#btn_back_to_login').click();
                    },600);
                };
                
                scope.fn_go_to_login = function() {
                    scope.modalLoginTabs.active_tab_index = 0;
                };
                
                scope.fn_go_to_forgot_password = function() {
                    scope.modalLoginTabs.active_tab_index = 1;
                };

                scope.fn_login();
            }
        };
    });
