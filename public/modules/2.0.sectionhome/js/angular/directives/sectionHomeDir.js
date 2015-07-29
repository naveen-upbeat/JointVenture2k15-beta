/**
 * @ngdoc directive
 * @name submodules.sectionhome:sectionHome
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for home section, loads the related template
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionhome')
    .directive('sectionHome', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-home.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
            }
        }

    });
