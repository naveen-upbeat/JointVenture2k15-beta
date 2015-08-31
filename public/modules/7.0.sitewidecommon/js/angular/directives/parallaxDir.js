/**
 * @ngdoc directive
 * @name submodules.sitewidecommon:appJvBodyDir
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for body tag, spy's on the body scroll and possibly animate the scrolling 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sitewidecommon')
    .directive('appJvParallax', [function() {
        return {
            link: function(scope, element, attrs) {

                $(element).find('.parallax').parallax();

            }

        };
    }]);
