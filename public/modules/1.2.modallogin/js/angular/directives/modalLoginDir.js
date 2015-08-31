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
    .directive('appJvModalLogin', function(userLoginSvc) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-modal-login.html',
            link: function(scope, element) {


                scope.$watch(function() {
                    return userLoginSvc.getUserSessionData();
                }, function(newVal, oldVal) {
                    if (newVal && (newVal.bln_logged_in)) {
                        $('#modalLogin').closeModal();
                        scope.modelLoginForm.fn_resetModel();
                    }
                }, true);

                $(element).find('.btn-back').on('click', function() {
                    scope.$apply(function() {
                        scope.modelLoginForm.str_modal_header = 'login';
                    });
                    $(element).find('ul.tabs').tabs('select_tab', 'tabLoginForm');
                });

                $(element).find('.link-forgot-password').on('click', function() {
                    scope.$apply(function() {
                        scope.modelLoginForm.str_modal_header = 'forgotpassword';
                    });
                    $(element).find('ul.tabs').tabs('select_tab', 'tabForgotPassword');
                });

            }
        };
    });
