angular.module('submodules.sectionrent')
    .directive('sectionRent', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/section-rent.html',
            link: function(scope, element, attrs, tabsCtrl) {
                addParallax(element);
            }
        }

    });
