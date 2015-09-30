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
    .directive('appJvBodyDir', ['$mdMedia', function($mdMedia) {
        return {
            link: function(scope, element, attrs) {

                /**
                 * LocationChangeSuccess - triggered everytime URL changes
                 * @param  {[type]} event       [description]
                 * @param  {[type]} newUrl      [description]
                 * @param  {[type]} oldUrl      [description]
                 * @param  {[type]} newState    [description]
                 * @param  {[type]} oldState){                     } [description]
                 * @return {[type]}             [description]
                 */
                scope.$on('$locationChangeSuccess', function(event, newURL, oldURL, newState, oldState) {
                    console.log(newURL);
                    siteWideCommonFunctions.scrollToSection(newURL.split('?scrollTo=')[1]);
                });
                scope.$on('$stateChangeSuccess', function(event, newState, newStateParams, oldState, oldStateParams) {
                    if (newStateParams.scrollTo) {
                        siteWideCommonFunctions.scrollToSection(newStateParams.scrollTo);
                    }
                });
            }
        };
    }]);
