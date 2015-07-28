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
