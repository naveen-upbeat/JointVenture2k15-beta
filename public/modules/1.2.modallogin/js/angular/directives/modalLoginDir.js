/**
 * @ngdoc directive
 * @name submodules.modallogin:appJvModalLogin
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for singin in modal, loads the related template
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.modallogin')
    .directive('appJvModalLogin', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-modal-login.html',
            link: function(scope, element) {

                $(element).find('.link-singnup').on('click', function() {
                    $('#modalLogin').modal('hide');
                });

                scope.$watch('user', function(newVal, oldVal) {
                    if (newVal && newVal != oldVal) {
                        //newVal.user
                    }
                }, true);

            }
        };
    });
