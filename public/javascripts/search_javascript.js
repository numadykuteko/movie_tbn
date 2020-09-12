$(document).ready(function () {

  callOnClick(".page-link", function(element) {
    var page = $(element).data("page");

    if (page != undefined && page >= 0 && page != reqPage) {
      reqPage = page;

      var link = "/search?keyword=" + reqKeyword + "&page=" + page;
      window.location.href = link;
    }
  });
});