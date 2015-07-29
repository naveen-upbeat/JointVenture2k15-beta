angular.module('submodules', [
        'submodules.3rdparty',
        'submodules.sitewidecommon',
        'submodules.navigationmain',
        'submodules.footermain',
        'submodules.servicesoffered',
        'submodules.sectionabout',
        'submodules.sectionportfolio',
        'submodules.sectionhome',
        'submodules.sectionjointventure',
        'submodules.sectionjointventureresults',
        'submodules.sectionrent',
		'submodules.sectionsell',
        'submodules.modallogin',
        'submodules.sectionsignup'
    ])
    .controller('MainController', function($rootScope, $scope, scrollToDivSvc) {

        $scope.appWideScope = {
            appTitle: 'Joint Venture 2015'
        };

        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
            	console.log(toState.name);
                if(toParams && typeof toParams.scrollTo !== 'undefined' ){
            		scrollToDivSvc.setCurrentDivId(toParams.scrollTo);
            	}
            });

    });
