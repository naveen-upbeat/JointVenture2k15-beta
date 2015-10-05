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
    .directive('appJvSectionRegisterUser', function($mdDialog,$state) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-register-user.html',
            link: function(scope, element, attrs, tabsCtrl) {
                var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
                if ($('head script[src="' + recaptchaSrc + '"]').length === 0) {
                    var captch_script = document.createElement('script');
                    captch_script.setAttribute('src', recaptchaSrc);
                    document.head.appendChild(captch_script);
                }

                scope.$watch('modelRegisterUserForm.success', function(newVal, oldVal) {
                    if (newVal) {
                        if (newVal === true) {
                          var confirm =  $mdDialog.confirm()
                                .title('User Registration Successful!')
                                .content('Please verify your email id to login with your credentials.')
                                .ariaLabel('Lucky day')
                                .ok('Go to Home');
                            $mdDialog.show(confirm).then(function() {
                                $state.go('home');
                            }, function() {
                                
                            });
                        }
                    }
                }, true);
            }
        };
    });
