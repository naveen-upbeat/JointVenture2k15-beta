/**
 * @ngdoc directive
 * @name submodules.sitewidecommon:appJvVerfiyCaptcha
 * @scope
 * @restrict AE
 *
 * @description
 * The directive is used for  verification of Captcha in a form
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sitewidecommon')
    .directive('appJvVerifyCaptcha', ['$q', '$interval', function($q, $interval) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                window.intervalRef = null;
                var isValid = false,
                    captchaTxtArea = $(element).find('#g-recaptcha-response');
                if (captchaTxtArea) {

                    // window.intervalRef = setInterval(function() {
                    //     if (captchaTxtArea.length && captchaTxtArea.val().length > 0) {
                    //         isValid = true;
                    //     } else {
                    //         isValid = false;
                    //     }
                    //     ngModel.$setValidity(attrs.ngModel, isValid);
                    // }, 5000);
                } else {
                    clearInterval(window.intervalRef);
                }
            }
        };
    }]);
