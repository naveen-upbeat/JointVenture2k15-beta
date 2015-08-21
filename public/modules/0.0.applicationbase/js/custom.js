/*
 * @author: naveen
 * @description: This file contains the list of functions used by various interactions 
 * of the user with the content / div / etc
 * 
 */

$(function() {
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown('slow');
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp('slow');
    });


    $('.main-menu-dd .dropdown-menu a').on('click', function(el) {
        $('.navbar-brand').click();
        $(el.target).parents('.dropdown').find('.toggle-text').text($(el.target).text());
    });

    $('.dropdown .dropdown-menu a').on('click', function(el) {
        setTimeout(function() {
            $(el.target).parents('.dropdown').removeClass('open');
        }, 500);
    });

    //The map is in different tab, switching tabb on clicking map-view
    $('#rent-details-map-view').on('change', function(e) {
        if ($(e.target).get(0).checked) {
            $('#nav-rent-details-map').tab('show');
        } else {
            $('#nav-rent-details-list').tab('show');
        }
    });

    //On page load set the containerHeight
    siteWideCommonFunctions.adjustngViewContainerHeight();

});

// variables used by addParallax() function
var prevDocScrollTop = $(document).scrollTop(),
    nowDocScrollTop;

function addParallax(selector) {
    var itemTopPos = [],
        itemHeight = [],
        origBgPosY = [];

    $(selector).each(function(index, item) {
        itemTopPos[index] = $(item).position().top;
        itemHeight[index] = $(item).height();
        origBgPosY[index] = parseInt($(item).css('background-position-y'));
    });
    // adding a 'scroll' event that adjusts the background position
    $(document).on('scroll', function() {
        nowDocScrollTop = $(this).scrollTop();
        $(selector).each(function(index, item) {
            //To restrict calling the function twice
            if (!$(item).data('parallax-added')) {
                var newBgPosY = [],
                    bgPosY = [],
                    $item = $(item);
                newBgPosY[index] = bgPosY[index] = parseInt($item.css('background-position-y'));

                if ((nowDocScrollTop > itemTopPos[index]) && (nowDocScrollTop < itemTopPos[index] + itemHeight[index])) {
                    newBgPosY[index] -= (nowDocScrollTop - prevDocScrollTop) * (100 / itemHeight[index]);
                    $item.css('background-position-y', newBgPosY[index] + 'px');
                } else {
                    $item.css('background-position-y', origBgPosY[index] + 'px');
                }
                $(data).data('parallax-added', true);
            }
        });
        prevDocScrollTop = nowDocScrollTop;
    });
}

// First, create an object containing LatLng.
var citymap = {};
citymap.bangalore = {
    center: new google.maps.LatLng(12.9667, 77.5667),
    population: 200
};

var cityCircle;
// Google map initialize() method
function initialize() {
    // Create the map.
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(12.9667, 77.5667),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var city in citymap) {
        var populationOptions = {
            strokeColor: '#0023f2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1133ff',
            fillOpacity: 0.35,
            map: map,
            draggable: true,
            editable: true,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
        };
        // Add the circle for this city to the map.
        cityCircle = new google.maps.Circle(populationOptions);
    }
}

//google.maps.event.addDomListener(window, 'load', initialize);

// Collection of common functions to be used by angular directives
var siteWideCommonFunctions = {

    adjustngViewContainerHeight: function() {
        setTimeout(function() {
            var $pageView = $('.page-view'),
                outerContentHeight = $pageView.children(0).outerHeight();
            if (outerContentHeight < 500) {
                outerContentHeight = 500;
            }
            $pageView.height(outerContentHeight);
            $('.ng-view-container').height(outerContentHeight);
        }, 300);

    },

    initMaterialDesign: function() {
        $.material.options = {
            "withRipples": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple",
            "inputElements": "input.form-control, textarea.form-control, select.form-control",
            "checkboxElements": ".checkbox > label > input[type=checkbox],label.checkbox > input[type=checkbox]",
            "radioElements": ".radio > label > input[type=radio]"
        };
        //$.material.init();
        //$.material.checkbox();
        //$.material.radio();
    }
};

//adjust the angular view container height on window resize
$(window).resize(function() {
    siteWideCommonFunctions.adjustngViewContainerHeight();
});
