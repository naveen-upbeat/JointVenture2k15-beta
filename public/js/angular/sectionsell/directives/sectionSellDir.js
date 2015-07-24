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
