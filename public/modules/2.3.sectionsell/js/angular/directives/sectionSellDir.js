/**
 * @ngdoc directive
 * @name submodules.sectionsell:sectionSell
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Sell section, loads the related template, 
 * Emits an event 'childLoading' to notify parent controller to intialize material.init();
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionsell')
    .directive('sectionSell', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-sell.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                scope.$emit('childLoading');
            }
        }

    });
