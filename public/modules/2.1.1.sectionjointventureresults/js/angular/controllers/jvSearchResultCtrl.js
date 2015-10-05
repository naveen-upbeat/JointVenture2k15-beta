    /**
     * @ngdoc controller
     * @name submodules.sectionjointventureresults:jvSearchResultCtrl
     * @scope
     * 
     * @description
     * The controller is used for Joint Venture Result section, displays search results
     *
     * @param {object}  field   A field object
     *
     */
    angular.module('submodules.sectionjointventure')
        .controller('jvSearchResultCtrl', ['$scope', 'transformRequestAsFormPost', '$http','$state', function($scope, transformRequestAsFormPost, $http, $state) {

            $scope.modelJvSearchForm = {
                'residential': {
                    'location': '',
                    'bedrooms': {
                        '1': false,
                        '2': false,
                        '3': false,
                        '4': false
                    },
                    'budget': {
                        'min': 0,
                        'max': 1
                    }
                },
                'commercial': {
                    'location': '',
                    'area': {
                        'unit': '',
                        'min': '',
                        'max': ''
                    },
                    'budget': {
                        'min': '',
                        'max': ''
                    }
                },
                'agricultural': {
                    'location': '',
                    'area': {
                        'unit': '',
                        'min': '',
                        'max': ''
                    },
                    'budget': {
                        'min': '',
                        'max': ''
                    }
                }
            };

            $scope.modelJvSearchResults={}; 

            $scope.fn_getJointVentureResults = function(form) {
                $http({
                    method: 'POST',
                    url: '/api/get_jointventure_results',
                    transformRequest: transformRequestAsFormPost,
                    data: {
                        'location': form.residential.location
                    }
                }).then(function(data){
                    
                });
            };

        }]);
