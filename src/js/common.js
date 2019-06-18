$(document).ready(function () {
  lazy();
  popup();
  compensateScrollbar();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
scrollbarWidth;


//lazy
function lazy() {
  $(".lazy").Lazy({
    effect: 'fadeIn',
    visibleOnly: true,
    effectTime: 300
  });
}
//
function compensateScrollbar() { 
  var div = $('<div style="height:100px; position: fixed; width: 100vw;"></div>'); 
  $('body').append(div); 
  var w1 = div.width(); 
  div.css('width', '100%'); 
  var w2 = div.width(); 
  $(div).remove();
  scrollbarWidth = w1 - w2;
}
//popup
function popup() {
  var $popupOpen = $('.popup-open'),
      $popupClose = $('.popup-close, .popup-overlay'),
      $popup = $('.popup');

  $popupOpen.on('click', function(e) {
    e.preventDefault();
    $($(this).attr('href')).fadeIn(300);
    compensateScrollbar();
    $(".compensate-scrollbar").css('padding-right', scrollbarWidth);
    $('body').css('overflow', 'hidden');
  })
  $popupClose.on('click', function(e) {
    e.preventDefault();
    $($(this).parents('.popup')).fadeOut(300);
    setTimeout(function() {
      $(".compensate-scrollbar").css('padding-right', '0');
      $('body').css('overflow', 'visible');
    }, 300)
  })

  //time-toggle
  $('.popup-form__time-toggle').on('click', function() {
    $('.popup-form__time-toggle').removeClass('active');
    $(this).addClass('active');
    if($(this).hasClass('later')) {
      $('.popup-form').addClass('later');
      $('.time-input').prop('required', true);
    } else {
      $('.popup-form').removeClass('later');
      $('.time-input').prop('required', false);
    }
  })
}
