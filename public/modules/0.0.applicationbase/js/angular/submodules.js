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
        'submodules.sectionsignup',
        'submodules.sectionsample'
    ])
    .controller('MainController', function($rootScope, $scope, scrollToDivSvc) {

        $scope.appWideScope = {
            appTitle : 'Joint Venture 2015',
            user : {
                username : '',
                email : ''
            }
        };
        /**
         * StateChangeSuccess - triggered everytime a change in state happens
         * @param  {[type]} event       [description]
         * @param  {[type]} toState     [description]
         * @param  {[type]} toParams    [description]
         * @param  {[type]} fromState   [description]
         * @param  {[type]} fromParams) {                           console.log(toState.name);                if(toParams && typeof toParams.scrollTo ! [description]
         * @return {[type]}             [description]
         */
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
            	console.log(toState.name);
                if(toParams && typeof toParams.scrollTo !== 'undefined' ){
            		scrollToDivSvc.setCurrentDivId(toParams.scrollTo);
            	}
            });

    });
