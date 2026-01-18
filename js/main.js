/* Grundejerforeningen Borrehøj - Main JavaScript */

$(document).ready(function() {
    // Mobile menu toggle
    $('.menu-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
    });

    // Mobile dropdown toggle
    $('.has-dropdown > a').on('click', function(e) {
        if ($(window).width() <= 768) {
            e.preventDefault();
            $(this).siblings('.dropdown').toggleClass('active');
        }
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-nav').length) {
            $('.nav-menu').removeClass('active');
            $('.dropdown').removeClass('active');
        }
    });

    // Close menu when window is resized above mobile breakpoint
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $('.nav-menu').removeClass('active');
            $('.dropdown').removeClass('active');
        }
    });

    // Mark current page in navigation
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-menu a').each(function() {
        var href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        }
    });

    // Update copyright year
    $('#copyright-year').text(new Date().getFullYear());

    // Check if event has passed and show message
    var eventDateText = $('.event-date').text();
    if (eventDateText) {
        var months = {
            'januar': 0, 'februar': 1, 'marts': 2, 'april': 3,
            'maj': 4, 'juni': 5, 'juli': 6, 'august': 7,
            'september': 8, 'oktober': 9, 'november': 10, 'december': 11
        };
        var match = eventDateText.match(/(\d+)\.\s*(\w+)\s*(\d{4})/);
        if (match) {
            var day = parseInt(match[1]);
            var month = months[match[2].toLowerCase()];
            var year = parseInt(match[3]);
            var eventDate = new Date(year, month, day);
            eventDate.setDate(eventDate.getDate() + 1);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (today > eventDate) {
                $('.event-passed').show();
                $('.event-date').addClass('passed');
            }
        }
    }
});
