!(function($) {
    // regular js
    function formatDate(myDate) {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
        var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
        var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

        return myDay + "<br>" + myMonth;
    }


    // ******************************************************************************************

    // Important - add this for all recruiter websites
    // Important - remove this for all jobboard sites
    // This is to be used in conjunction with [[user-loginstatus-with-menu]]

    $(function() {
        $("span.GroupStatus-logInBefore a").remove();
        $("span.GroupStatus-logInBefore").html('<a href="/member/login.aspx" style="padding-top:5px;">Login</a>');
        $("span.GroupStatus-registerBefore a").remove();
        $("span.GroupStatus-registerBefore").html('<a href="/member/register.aspx" style="padding-top:5px;">Register</a>');
    });

    // ******************************************************************************************

    // jquery
    $(function() {

        // removes duplicate bootstrap libraries

        $("link[href*='/media/COMMON/newdash/lib/bootstrap.min.css']").remove();
        $("script[src*='/media/COMMON/newdash/lib/bootstrap.min.js']").remove();


        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        var currentPage = window.location.pathname.toLowerCase();

        // remove empty li's on the system pages.
        $("#side-left li:empty").remove();

        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }

        // Page Title
        $('.dynamic-content-holder h1:first').appendTo($('.page-title .inner-title'));
        $('#content-container #content h1:first').appendTo($('.page-title .inner-title'));
        $('#CV-content h1.CV-Builder-title').appendTo($('.page-title .inner-title'));

        /* Adding Bootstrap Classes */
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        $('#dynamic-container, #content-container, #job-dynamic-container').wrapInner('<div class="row"></div>');

        // dynamic side columns column
        $('#dynamic-side-right-container, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        if (!$("#r_full-width").length) {
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs col-sm-4 col-md-3');
            if ($.trim($('#dynamic-side-left-container, #side-left').html()).length) {
                $('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
            } else {
                $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            }
        } else {
            $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        }

        // Dynamic Content column
        if ($.trim($('#side-left').html()).length) {
            $('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
        } else {
            $('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
        }

        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');

        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $(".nav li li.active").closest(".nav > li").addClass("active");

        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });



    });


    // Resize action
    $(window).on('resize', function() {

        var wi = $(this).width();

        // Mobile & Tablet
        if (wi <= 992) {
            $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
        }
        //  Desktop
        else {
            $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        }

    });

    $(document).ready(function() {

        $(".jxt-premium-job").prepend('<div class="premiumtag">Premium</div>');
        $(".jxt-standout-job").prepend('<div class="standoutTag">Standout</div>');

        // Resize action
        var $window = $(window);
        // Function to handle changes to style classes based on window width
        function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
            }
        }
        // Execute on load
        checkWidth();
        // Bind event listener
        $(window).resize(checkWidth);


          //Full width landing page
        if ($("#r_full-width").length) {
            $('#dynamic-content, #content').removeClass('col-sm-12 col-md-12 col-sm-8 col-md-9');
            $('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
            $('#dynamic-container').removeClass('container').css('padding', '0');
            $("#dynamic-content h1:first, #content-container h1:first").appendTo($("#header .inner_banner .landing-title"));
            $('#dynamic-content').css('padding', '0');
        }

        //    body class

        var pageTitle = window.location.pathname.replace("/", "");
            if (pageTitle != "") {
                $("body").addClass(pageTitle);
            }


        // Home services - carousel
        $('.t-gallery').Gallerycarousel({
            autoRotate: 4000,
            visible: 4,
            speed: 1200,
            easing: 'easeOutExpo',
            itemMinWidth: 250,
            itemMargin: 30
        });


        // Latest Jobs widget
        var owl;
        $("#myJobsList > div").includeFeed({
            baseSettings: {
                rssURL: [ $(this).prop("url") || "/job/rss.aspx?search=1&addlocation=1" ]
            },
            templates: {
                itemTemplate: "<div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-description'>{{description}}</span></div>"
            },
            complete: function() {
                $(this).owlCarousel({
                    autoPlay: 3000, //Set AutoPlay to 3 seconds
                    loop: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        }
                    }
                });
                owl = $(this).data('owlCarousel');
                $(".prev-btn").on("click", function(e) {
                    e.preventDefault();
                    owl.prev();
                });
                $(".next-btn").on("click", function(e) {
                    e.preventDefault();
                    owl.next();
                });
            }
        });



        // Equal Height
        $.fn.eqHeights = function(options) {

            var defaults = {
                child: false
            };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }

            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {

                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });

            $(elements).height(max_height);
        };

        // Equal Height - Usage
        $('.staff-holder').eqHeights();
        $('.service-holder').eqHeights();


        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            $("html, body").animate({
                scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - $("#dynamic-content, #content").css("padding-top").replace(/[^-\d\.]/g, '')
            }, 100);
        }




        var $individual_info = $('#individual-info');
        $individual_info.hide(0);

        // import consultants into consultants page.
        if ($(".meet-team").length) {
            var teamUL = $(".team-list");
            teamUL.includeFeed({
                baseSettings: {
                    repeatTag: "consultant",
                    rssURL: ["/consultantsrss.aspx"],
                    addNBSP: false,
                    limit: 200
                },
                templates: {
                    itemTemplate: '<li id="consultant-{{ConsultantID}}"><div class="thumb-box clearfix"><div class="team-overlay"><a href="/meet-the-team#consultant-{{ConsultantID}}"><img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}"><span class="team-read-more-btn"><span>Read More</span></span></a></div></div><div class="team-desc-main col-sm-8"><div class="team-desc"><h2>{{FirstName}} {{LastName}}</h2><span>{{PositionTitle}}</span><p>{{ShortDescription}}</p><div class="contact-detail"><ul class="list-inline site-social"><li><a href="{{LinkedIn}}" target="_blank" title="twitter"><i class="fa fa-twitter"></i></a></li><li><a href="{{Facebook}}" target="_blank" title="facebook"><i class="fa fa-facebook"></i></a></li><li><a href="{{Twitter}}" target="_blank" title="linkedin"><i class="fa fa-linkedin"></i></a></li></ul></div></div></div></li>'
                },
                complete: function() {

                    $('.meet-team-main .team-list a').on('click', function(e) {
                        e.preventDefault();
                    })
                    $('.meet-team-main .team-list li').on('click', function(e) {
                        e.preventDefault();
                        var inner_banner_height = $('.page-title')[0].offsetHeight;
                        var mobile_nav_bar_height = $('button.navbar-toggle')[0].offsetHeight;
                        var individual_section = $(this).html();
                        var scroll_offset = 0;
                        var scroll_offset = inner_banner_height - $("#site-topnav").outerHeight(true, true);
                        if (window.innerWidth < 768) {
                            scroll_offset = $("#individual-info").offset().top;
                        }
                        $('html, body').animate({
                            'scrollTop': scroll_offset
                        }, 1000);
                        if ($individual_info.is(':visible')) {
                            $individual_info.fadeOut('fast', function() {
                                $(this).html('').append(individual_section).fadeIn('fast');
                                $(this).find(".thumb-box").addClass("col-sm-4")
                                $(this).append('<a class="thumb-close-btn" title="close" href="#"><i class="fa fa-times"></i></a>');
                            });
                        } else {
                            $individual_info.html('').append(individual_section);
                            $individual_info.find(".thumb-box").addClass("col-sm-4")
                            $individual_info.append('<a class="thumb-close-btn" title="close" href="#"><i class="fa fa-times"></i></a>');
                            $individual_info.slideDown('slow');
                        }
                    });
                    $("body").on("click", ".thumb-close-btn", function(e) {
                        e.preventDefault();
                        $individual_info.slideUp();
                    });
                    $(".meet-team .btn").click(function(e) {
                        e.preventDefault();
                        $(".team-row").slideDown();
                        $(this).fadeOut();
                    });

                    // detect in there is a hash in the url, then click the link pointing to it if there is.
                    if ( location.hash && $(location.hash).length )
                    {
                        $(location.hash).click();
                    }


                }
            });
        }

        //client testimonial
        var owl;
        $("#client-testimonial > div").each(function () {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/NewsRSS.aspx"],
                    addNBSP: false
                },
                templates: {
                    itemTemplate: "<div><div class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></div></div>"
                },
                complete: function () {

                    $(this).owlCarousel({
                         items: 1,
                        autoplay: true,
                        loop: true,
                        pagination: false,
                        nav: true,
                        navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],

                    });

                }
            });
        });

        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        };
        var demo1 = new CountUp("countelement1", 0, 486, 0, 3, options);
        var demo2 = new CountUp("countelement2", 0, 16, 0, 3, options);
        var demo3 = new CountUp("countelement3", 0, 4, 0, 3, options);
        var demo4 = new CountUp("countelement4", 0, 1453, 0, 3, options);


        $(window).scroll(function() {
            if ($(window).scrollTop() > 200) {
                $("#site-topnav").addClass("shadow");
            } else {
                $("#site-topnav").removeClass("shadow");
            }

            if ($(".sec-about").length > 0) {
                if ($(window).scrollTop() > ($(".sec-about").offset().top - ($(window).height() / 2))) {
                    demo1.start();
                    demo2.start();
                    demo3.start();
                    demo4.start();

                }
            }
        });

        $(".search-box").click(function(e) {
            e.preventDefault();
            e.stopPropagation()
            $(this).toggleClass("active")
            $("#widget-search").slideToggle()
        })
        $("#widget-search").click(function(e) {
            e.stopPropagation()
        })

        // add iframe url for a map
        function loadMap(iframeObject)
        {
            // if the iframe has no src or a blank src, and it has a data-src attribute
            if ( !(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src") )
            {
                iframeObject.attr("src", iframeObject.attr("data-src"));
            }
        }
        // scroll to a map
        function scrollToDiv(divID)
        {
            $("html, body").animate({
                scrollTop: $(divID).offset().top - ( $("#r27_header-container").height() || 0 ) - 20
            }, 300);
        }
        // if a location hash is on the url, add active to the div.
        if ( location.hash && $(location.hash + ".r27_map").length )
        {
            $(location.hash + ".r27_map").addClass("active");
        }
        else
        {
            // otherwise, just make the first map active.
            $(".r27_map:first").addClass("active");
        }
        loadMap($(".r27_map.active iframe"));
        // contact page maps on click
        $(".r27_contact-map-link").click(function(e){
            var myLink = $(this).attr("href")
            var targetMap = $( myLink.substr(myLink.indexOf("#")) );
            if ( targetMap.length )
            {
                e.preventDefault();
                loadMap(targetMap.children("iframe"));
                scrollToDiv(targetMap);
                $(".r27_map").not(targetMap).removeClass("active");
                targetMap.addClass("active");
            }
        });
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function(){
            $(this).hide();
        });


        new WOW().init();

    });




})(jQuery);
