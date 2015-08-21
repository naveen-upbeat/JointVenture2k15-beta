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
                //Hide the modal login while opening signup section
                $('#modalLogin').modal('hide');

                scope.$watch("usertypes", function(newVal, oldVal) {
                    if (newVal.length !== oldVal.length) {
                        scope.$emit('childLoading');
                    }
                });

                $(element).find('#inputEmail').on('blur', function(event) {
                    scope.$apply(function() {
                        scope.signupUser.emailmodel = $(event.target).val();
                    });
                });

                scope.$emit('childLoading');
            }
        };
    });
