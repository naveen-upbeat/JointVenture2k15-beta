/**
 * @ngdoc directive
 * @name submodules.sectionsignup:appJvSectionSignup
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for signup section, loads the related template
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionsignup')
    .directive('appJvSectionSignup', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-signup.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                $('#modalLogin').modal('hide');

                scope.$emit('childLoading');
            }
        };
    });
