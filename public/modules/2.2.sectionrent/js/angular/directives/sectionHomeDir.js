/**
 * @ngdoc directive
 * @name submodules.sectionrent:appJvSectionRent
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Rent section, loads the related template, 
 * Adds a parallax to background image.
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionrent')
    .directive('appJvSectionRent', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-rent.html',
            link: function(scope, element, attrs, tabsCtrl) {
                addParallax(element);
            }
        }

    });
