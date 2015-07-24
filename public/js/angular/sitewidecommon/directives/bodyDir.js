angular.module('submodules.sitewidecommon')
    .directive('bodyDir', ['scrollToDivSvc', function(scrollToDivSvc) {
        return {
            link: function(scope, element, attrs) {

                scope.$watch(scrollToDivSvc.getCurrentDivId, function(newVal, oldVal) {
                    if ( newVal && newVal !== oldVal ) {

                        var target = $('#' + newVal);
                        target = target.length ? target : $('[name=' + newVal + ']');
                        if ( target.length ) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                        }
                    }
                });
            }
        }
    }]);
