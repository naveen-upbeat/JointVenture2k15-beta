/**
 * @ngdoc directive
 * @name submodules.sitewidecommon:appJvVerifyUserSession
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for button/hyperlink elements, check if user session exists, otherwise show popup
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sitewidecommon')
    .directive('appJvVerifyUserSession', ['$mdMedia', function($mdMedia) {
        return {
            link: function(scope, element, attrs) {

                
            }
        };
    }]);
