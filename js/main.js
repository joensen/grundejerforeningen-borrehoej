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
});
