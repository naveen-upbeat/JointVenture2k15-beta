angular.module('submodules.sectionsignup')
    .directive('sectionSignup', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-signup.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                $('#modalLogin').modal('hide');
            
                scope.$emit('childLoading');
            }


        }

    });
