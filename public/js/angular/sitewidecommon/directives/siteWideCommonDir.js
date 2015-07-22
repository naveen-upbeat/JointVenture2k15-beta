angular.module('submodules.sitewidecommon')
    .directive('siteWideCommon', [ function() {
	return {
		link: function(scope, element, attrs) {
			var commonFns = attrs.siteWideCommon.split(",");
			for(var i=0; i<commonFns.length; i++){
				if(typeof siteWideCommonFunctions[commonFns[i]] != 'undefined'){
					siteWideCommonFunctions[commonFns[i]]();
				}
			}
		}
	};
}]);
