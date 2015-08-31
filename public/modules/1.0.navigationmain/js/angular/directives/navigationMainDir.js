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
    .directive('appJvNavigationMain', function(userLoginSvc) {
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

                element.find('.link_logout').on('click', function() {
                    scope.$apply(function() {
                        scope.fn_logoutUser();
                    });
                });
            }
        };

    });
