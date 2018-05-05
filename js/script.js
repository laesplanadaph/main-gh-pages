$(function() {

  "use strict";

  var topoffset = 50; //variable for menu height
  var slideqty = $('#featured .item').length;
  var slideqtygallery = $('#quote-carousel .item').length;
  var slideqtyquote = $('#quote-carousel .item').length;
  var wheight = $(window).height(); //get the height of the window
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#featured .item').eq(randSlide).addClass('active');
  $('#quote-carousel .item').eq(randSlide).addClass('active');


  $('.fullheight').css('height', wheight); //set to window tallness


  //replace IMG inside carousels with a background image
  $('#featured .item img').each(function() {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize
  $(window).resize(function() {
    wheight = $(window).height(); //get the height of the window
    $('.fullheight').css('height', wheight); //set to window tallness
  });


  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#featured') {
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }


  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#featured') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });


  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top-topoffset+2
      }, 500);
      return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  $('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
  });

  //Automatically generate carousel indicators
  //featured
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  });

  //testimonials
  for (var i=0; i < slideqtyquote; i++) {
    var insertTextquote = '<li data-target="#quote-carousel" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertTextquote += ' class="active" ';
    }
    insertTextquote += '></li>';
    $('#quote-carousel ol').append(insertTextquote);
  }

  $('#quote-carousel').carousel({
    pause: true,
    interval: 4000,
  });

  // swipe
  $("#featured").swiperight(function() {
    $(this).carousel('prev');
  });
  $("#featured").swipeleft(function() {
    $(this).carousel('next');
  });

  $("#quote-carousel").swiperight(function() {
    $(this).carousel('prev');
  });
  $("#quote-carousel").swipeleft(function() {
    $(this).carousel('next');
  });


  // Initialize Google Maps

  var locations = [
  ['Iglesia Ni Cristo', 16.189644, 120.000755, 2],
  ['Our Location', 16.189180, 120.001426, 1]
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: new google.maps.LatLng(16.189588, 120.001244),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  });

  var marker, i;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: locations[i][0],
      maxWidth: 160
    });
    infowindow.open(map, marker);
  }

});
