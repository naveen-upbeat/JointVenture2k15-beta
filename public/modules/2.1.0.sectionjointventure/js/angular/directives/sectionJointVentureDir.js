    /**
     * @ngdoc directive
     * @name submodules.sectionjointventure:appJvSectionJointVenture
     * @scope
     * @restrict AE
     *
     * @description
     * The directive for Joint Venture section, loads the related template, 
     * loads location suggestion dropown
     *
     * @param {object}  field   A field object
     *
     */
    angular.module('submodules.sectionjointventure')
        .directive('appJvSectionJointVenture', ['googleMapsAPI', function(googleMapsAPI) {
            return {
                restrict: "AE",
                templateUrl: 'templates/tpl-section-jointventure.html',
                link: function(scope, element, attrs, tabsCtrl) {

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

                    window.initService = function(query) {
                        var displaySuggestions = function(predictions, status) {
                            scope.locationPredictionsNow = [];
                            if (status != google.maps.places.PlacesServiceStatus.OK) {
                                console.log(status);
                                return;
                            }
                            predictions.forEach(function(prediction) {
                                scope.locationPredictionsNow.push(prediction);
                            });
                        };
                        if (google.maps.places) {

                            var service = new google.maps.places.AutocompleteService();
                            service.getQueryPredictions({
                                input: query || ''
                            }, displaySuggestions);
                        }
                    };

                    scope.loadSearchCityTags = function() {
                        var googleAPIScriptSrc = 'http://maps.googleapis.com/maps/api/js?libraries=places&window=initService';
                        if ($('head script[src="' + '"]').length === 0) {
                            var googleMapsAPIScript = document.createElement('script');
                            googleMapsAPIScript.setAttribute('src', googleAPIScriptSrc);
                            document.head.appendChild(googleMapsAPIScript);
                        }


                        /* $('#searchcity').selectize({
                            plugins: ['remove_button'],
                            persist: false,
                            maxItems: 4,
                            valueField: 'place_id',
                            labelField: 'description',
                            searchField: ['description'],
                            options: [{
                                description: 'bengaluru',
                                place_id: "ChIJbU60yXAWrjsR4E9-UejD3_g"
                            }],
                            render: {
                                item: function(item, escape) {
                                    return '<div>' +
                                        (item.description ? '<span class="item" title="'+item.description+'">' + escape(item.description).substring(0,6)+'...' + '</span>' : '') +
                                        '</div>';
                                },
                                option: function(item, escape) {
                                    var label = item.description;
                                    return '<div>' +
                                        '<span class="label">' + escape(label) + '</span>' +
                                        '</div>';
                                }
                            },
                            load: function(query, callback) {
window initService(query);
                                callback(window.locationPredictionsNow);
                            }
                        }); */
                    };

                    scope.loadSearchCityTags();

                    scope.loadAddrTags = function(query) {
                        var options = {
                            input: query,
                            types: "geocode",
                            location: "12.9539975,77.6309395",
                            radius: 25000
                        };
                        return googleMapsAPI.getLocationSuggestions(options)
                            .then(function(response) {
                                if (response.data.status == "OK") {
                                    return response.data.predictions;
                                }
                            });
                    };

                }
            };

        }]);
