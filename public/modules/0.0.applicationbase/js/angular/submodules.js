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
    .controller('MainController', ['$rootScope', '$scope', 'userLoginSvc', '$state', function($rootScope, $scope, userLoginSvc, $state) {

        $scope.appWideScope = {
            'str_app_title': 'Joint Venture 2015',
            'user_session_data': {
                'is_logged_in': false,
                'user_data': {}
            }
        };

        userLoginSvc.getUserFromServerSession().success(function(data, status, headers, cfg) {
            if ('user_data' in data && ('_id' in data.user_data)) {
                userLoginSvc.setUserSessionData(data.user_data);
            }
        });

        $scope.$watch(function() {
            return userLoginSvc.getUserSessionData();
        }, function(newVal, oldVal) {
            if (newVal && (newVal.bln_logged_in !== oldVal.bln_logged_in)) {
                $scope.appWideScope.user_session_data.is_logged_in = newVal.bln_logged_in;
                $scope.appWideScope.user_session_data.user_data = newVal.user_data;
            }
        }, true);
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

            });

        $scope.fn_goToState = function(stateName, scrollTo) {
            if (!scrollTo) {
                $state.go(stateName);
            }else{
                $state.transitionTo($state.current.name, { scrollTo: scrollTo});
            }
        };

    }]);
