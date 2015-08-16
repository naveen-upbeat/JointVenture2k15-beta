/**
 * @ngdoc directive
 * @name submodules.sitewidecommon:appJvSiteWideCommon
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for sitewidecommon functionality and event to handle the 'childLoading' 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sitewidecommon')
    .directive('appJvSiteWideCommon', [function() {
        return {
            link: function(scope, element, attrs) {

                scope.$on('childLoading', function() {

                    var commonFns = attrs.appJvSiteWideCommon.split(",");
                    for (var i = 0; i < commonFns.length; i++) {
                        if (typeof siteWideCommonFunctions[commonFns[i].toString().trim()] != 'undefined') {
                            siteWideCommonFunctions[commonFns[i].toString().trim()]();
                        }
                    }
                });
            }
        };
    }]);
