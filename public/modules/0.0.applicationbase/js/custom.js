/*
 * @author: naveen
 * @description: This file contains the list of functions used by various interactions 
 * of the user with the content / div / etc
 * 
 */
(function($) {
    $(function() {
        //On page load set the containerHeight
        //siteWideCommonFunctions.adjustngViewContainerHeight();
    });
})(jQuery);

// Collection of common functions to be used by angular directives
var siteWideCommonFunctions = {

    adjustngViewContainerHeight: function() {
        setTimeout(function() {
            var $pageView = $('.page-view'),
                outerContentHeight = $pageView.children(0).outerHeight();
            if (outerContentHeight < 500) {
                outerContentHeight = 500 + parseInt($pageView.children(0).css('padding-top'));
            }
            $pageView.height(outerContentHeight);
            $('.ng-view-container').height(outerContentHeight);
        }, 300);

    },
    scrollToSection: function(divId) {
        if ($('#' + divId).length > 0) {
            $('html, body').animate({
                scrollTop: $("#" + divId).offset().top
            }, 1500,'easeOutCubic');
        }
    }

};