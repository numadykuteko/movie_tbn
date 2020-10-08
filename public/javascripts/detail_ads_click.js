$(document).ready(function () {
  var count_on_click = 0;

  $(document).off("click", ".select-video-to-play").on("click", ".select-video-to-play", function() {
    if (is_need_ads === true && count_on_click % 2 == 1) {
      var win = window.open('//a.o333o.com/api/direct/278171?s1=&kw=', '_blank');
      if (win) {
          win.focus();
      } else {
      }
    } else {
      // do-no-thing
    }

    count_on_click++;
    
  });
});