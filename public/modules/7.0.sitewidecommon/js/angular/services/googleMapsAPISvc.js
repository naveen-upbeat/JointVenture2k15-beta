/**
 * @ngdoc service
 * @name submodules.sitewidecommon:googleMapsAPI
 * @description
 * A googleMapsApi service with useful functions
 */
angular.module('submodules.sitewidecommon')
    .service('googleMapsAPI', ['$http', function($http) {
		
		var googleAPIKey = "AIzaSyBVb3vFIGCpc3et0NSf42IfMFyzrxHzogM";
		var bangaloreLatLang = "12.9539975,77.6309395";

    	this.getLocationSuggestions = function(options){
    		var input = options.input || options[0],
    			types = options.types || options[1] || "regions",
    			location = options.location,
    			radius = options.radius,
    			responseJson = {};

    		var autoCompleteURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    		var post = {
    			input: input,
    			types: "geocode",
    			location : bangaloreLatLang,
    			radius: "25000",
    			key: googleAPIKey	
    		}

    		var httpOptions = {
    			method: 'GET',
    			url : autoCompleteURL,
    			params : post
    		}
			responseJson = $http(httpOptions);

    		return responseJson;
    	};

}]);
