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
                    $(element).find('select').material_select();
                    $(element).find('select').
                    //addParallax(element);
                    scope.addrtags = [];

                    window.predictionsNow = [];

                    window.initService = function(query) {
                        var displaySuggestions = function(predictions, status) {
                            window.predictionsNow = [];
                            if (status != google.maps.places.PlacesServiceStatus.OK) {
                                alert(status);
                                return;
                            }

                            predictions.forEach(function(prediction) {
                                window.predictionsNow.push(prediction);
                            });
                        };

                        var service = new google.maps.places.AutocompleteService();
                        service.getQueryPredictions({
                            input: query || ''
                        }, displaySuggestions);
                    };


                    scope.loadSearchCityTags = function() {

                        var googleMapsAPIScript = document.createElement('script');
                        googleMapsAPIScript.setAttribute('src', 'http://maps.googleapis.com/maps/api/js?libraries=places&callback=initService');
                        document.head.appendChild(googleMapsAPIScript);

                        $('#searchcity').selectize({
                            plugins: ['remove_button'],
                            persist: false,
                            maxItems: 4,
                            valueField: 'place_id',
                            labelField: 'description',
                            searchField: ['description'],
                            /*options: [{
                                description: 'bengaluru',
                                place_id: "ChIJbU60yXAWrjsR4E9-UejD3_g"
                            }],*/
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
                                initService(query);
                                callback(window.predictionsNow);
                            }
                        });
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

                    $(element).find('button').on('click', function(e) {
                        var value = $(e.target).parent().find('input#Area').val();
                    });
                    scope.$emit('childLoading');
                }
            };

        }]);
