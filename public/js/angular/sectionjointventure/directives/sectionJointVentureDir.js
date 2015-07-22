angular.module('submodules.sectionjointventure')
    .directive('sectionJointVenture', ['googleMapsAPI',function(googleMapsAPI) {
        return {
            restrict: "AE",
            templateUrl: 'templates/section-jointventure.html',
            link: function(scope, element, attrs, tabsCtrl) {
                //addParallax(element);
                scope.addrtags = [{
                    "description" : "sample1",
                    "place_id":"place1",
                    "text":"text1"
                  },{
                    "description" : "what a what",
                    "plac_id":"place2",
                    "text" :"text2"
                }];

                scope.loadAddrTags = function(query){
                  var options = {
                        input : query,
                        types: "geocode",
                        location: "12.9539975,77.6309395",
                        radius: 25000
                    };
                    return googleMapsAPI.getLocationSuggestions(options)
                    .then(function(response){
                        if ( response.data.status == "OK" ){
                            return response.data.predictions
                        }
                    });
                } 
                
                $(element).find('button').on('click', function(e){
                    var value = $(e.target).parent().find('input#Area').val();

                    

                });


            }
        }

    }]);
