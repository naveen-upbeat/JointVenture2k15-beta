/**
 * @ngdoc directive
 * @name submodules.sectionjointventureresults:appJvSectionJointVentureResults
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Joint Venture Results section, loads the related template, 
 * loads location suggestion dropown
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionjointventureresults')
    .directive('appJvSectionJointVentureResults', ['googleMapsAPI', function(googleMapsAPI) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-jointventure-results.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                scope.addrtags = [];
                scope.locationPredictionsNow = [];
                scope.selectedLocations = [];
                scope.selectedLocation = null;
                scope.searchLocationText = null;

                scope.searchTextChange = function(searchText) {
                    scope.searchLocationText = searchText;
                    scope.modelJvSearchForm.residential.location = searchText;
                    if (searchText !== '') {
                        window.initService(searchText);
                    }
                };

                /**
                 * Search for Locations in Predictions.
                 */
                function querySearch(query) {
                    var results = query ? scope.locationPredictionsNow.filter(createFilterFor(query)) : [];
                    return results;
                }
                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(location) {
                        return (location._lowername.indexOf(lowercaseQuery) === 0) ||
                            (location._lowertype.indexOf(lowercaseQuery) === 0);
                    };
                }


                scope.$emit('childLoading');

            }
        };

    }]);
