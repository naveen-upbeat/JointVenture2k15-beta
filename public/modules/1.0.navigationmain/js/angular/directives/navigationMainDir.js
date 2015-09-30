/**
 * @ngdoc directive
 * @name submodules.navigationmain:appJvNavigationMain
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for main navigation, loads the template related to the main navigation
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.navigationmain')
    .directive('appJvNavigationMain', function(userLoginSvc, $mdMedia, $mdSidenav, $mdDialog, $state) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-navigation-main.html',
            link: function(scope, element, attrs) {
                
                scope.$emit('childLoading');

                scope.fn_logoutUser = function() {
                    userLoginSvc.logoutUser().success(function(data, status, headers, cfg) {
                        userLoginSvc.clearUserSessionData();
                    });
                };

                scope.fn_toggle_sidenav = function(menuId) {
                    $mdSidenav(menuId).toggle();
                };
                
                scope.fn_open_menu = function($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };
                
                scope.fn_show_login_dialog = function(ev) {
                    $mdDialog.show({
                            template: '<md-dialog aria-label="Login" ng-controller="modalLoginCtrl" layout="row" flex="45">' +
                                '<app-jv-modal-login>' +
                                '</app-jv-modal-login>' +
                                '</md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true
                        })
                        .then(function(answer) {
                            
                        }, function() {
                            
                        });
                };
            }
        };

    });
