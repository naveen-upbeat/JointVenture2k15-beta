/**
 * @ngdoc directive
 * @name submodules.sectionrent:appJvSectionRent
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Rent section, loads the related template, 
 * Adds a parallax to background image.
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionrent')
    .directive('appJvSectionRent', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-rent.html',
            link: function(scope, element, attrs) {
            	var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
                if ($('head script[src="' + recaptchaSrc + '"]').length === 0) {
                    var captch_script = document.createElement('script');
                    captch_script.setAttribute('src', recaptchaSrc);
                    document.head.appendChild(captch_script);
                }
            }
        };
    });
