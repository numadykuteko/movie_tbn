$(document).ready(function () {
  $(document).off("click", ".common-item-list").on("click", ".common-item-list", function() {
    if (is_need_ads === true) {
      var win = window.open('//a.o333o.com/api/direct/278072?s1=&kw=', '_blank');
      if (win) {
          win.focus();
      } else {
      }
    }

  });
});