angular.module('submodules.sectionjointventure')
    .directive('sectionJointVenture', ['googleMapsAPI', function(googleMapsAPI) {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-jointventure.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                scope.addrtags = [];

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
                                return response.data.predictions
                            }
                        });
                }

                $(element).find('button').on('click', function(e) {
                    var value = $(e.target).parent().find('input#Area').val();



                });


                $(element).find('#farmtype,#budget').multiselect({
                    buttonWidth: '100%',
                    buttonText: function(options, select) {
                        if (options.length === 0) {
                            return $(select).attr('id').toString();
                        } else {
                            var labels = [];
                            options.each(function() {
                                if ($(this).attr('label') !== undefined) {
                                    labels.push($(this).attr('label'));
                                } else {
                                    labels.push($(this).html());
                                }
                            });
                            return labels.join(', ') + '';
                        }
                    }
                });
                scope.$emit('childLoading');
            }
        }

    }]);
