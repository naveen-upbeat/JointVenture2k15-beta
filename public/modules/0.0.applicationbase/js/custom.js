/*
 * @author: naveen
 * @description: This file contains the list of functions used by various interactions 
 * of the user with the content / div / etc
 * 
 */
(function($) {
    $(function() {
        /* START: Materialize Initializing parallax and sideNav */
        siteWideCommonFunctions.initMaterialDesign();
        /* END: Materialize INIT  */
        
        //The map is in different tab, switching tabb on clicking map-view
        $('#rent-details-map-view').on('change', function(e) {
            if ($(e.target).get(0).checked) {
                $('#nav-rent-details-map').tab('show');
            } else {
                $('#nav-rent-details-list').tab('show');
            }
        });

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

    initMaterialDesign: function() {
        //materialize init code
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('.modal-trigger').leanModal({dismissible:true});
        $('ul.tabs').tabs();
        $('.dropdown-button').dropdown();
        
    },

    scrollToSection: function(divId) {
        if ($('#' + divId).length > 0) {
            $('html, body').animate({
                scrollTop: $("#" + divId).offset().top
            }, 2000);
        }
    }
};
