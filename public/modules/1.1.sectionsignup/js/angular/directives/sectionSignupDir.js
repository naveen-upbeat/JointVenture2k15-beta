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
                
                $(element).find('select').material_select();

                //Hide the modal login while opening signup section
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

                $(element).find('#showPassword field-confirm-password').on('change',function(event){
                    if(this.checked){

                    }
                });

                scope.signupNewUser = function(formSignupUser) {
                    console.log(formSignupUser);
                };

                scope.$emit('childLoading');
                
                var captch_script = document.createElement('script');
                captch_script.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
                document.head.appendChild(captch_script);
            }
        };
    });