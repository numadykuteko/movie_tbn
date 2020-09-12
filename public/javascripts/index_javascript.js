$(document).ready(function () {

  var getLinkForFilter = function(type, category, year, quality, page) {
    var link = "/filter?";

    if (type!=undefined && type.length>0) {
      link+= ("&type=" + type);
    }
    
    if (category!=undefined && category.length>0) {
      link+= ("&genres=" + category);
    }

    if (year!=undefined && year.length>0) {
      link+= ("&year=" + year);
    }

    if (quality!=undefined && quality.length>0) {
      link+= ("&quality=" + quality);
    }

    if (page!=undefined) {
      link+= ("&page=" + page);
    }

    return link;
  }

  $(document).off("change", "#selectType").on("change", "#selectType", function() {
    if($('#selectType option:selected').val() == -1) {
      if (reqType == "") return;
      reqType = "";
    } else if ($('#selectType option:selected').val() == 1) {
      if (reqType == "movie") return;
      reqType = "movie";
    } else if ($('#selectType option:selected').val() == 2) {
      if (reqType == "series") return;
      reqType = "series";
    }

    var link = getLinkForFilter(reqType, reqCategory, reqYear, reqQuality, 1);
    window.location.href = link;
  });

  $(document).off("change", "#selectGenres").on("change", "#selectGenres", function() {
    var choosenCategory = $('#selectGenres option:selected').val();
    
    if (choosenCategory != -1) {
      reqCategory = choosenCategory;
    } else {
      reqCategory = "";
    }

    var link = getLinkForFilter(reqType, reqCategory, reqYear, reqQuality, 1);
    window.location.href = link;
  });

  $(document).off("change", "#selectYear").on("change", "#selectYear", function() {
    var choosenYear = $('#selectYear option:selected').val();
    
    if (choosenYear != -1) {
      reqYear = choosenYear;
    } else {
      reqYear = "";
    }

    var link = getLinkForFilter(reqType, reqCategory, reqYear, reqQuality, 1);
    window.location.href = link;
  });

  $(document).off("change", "#selectQuality").on("change", "#selectQuality", function() {
    var choosenQuality = $('#selectQuality option:selected').val();
    
    if (choosenQuality != -1) {
      reqQuality = choosenQuality;
    } else {
      reqQuality = "";
    }

    var link = getLinkForFilter(reqType, reqCategory, reqYear, reqQuality, 1);
    window.location.href = link;
  });

  callOnClick(".page-link", function(element) {
    var page = $(element).data("page");

    if (page != undefined && page >= 0 && page != reqPage) {
      reqPage = page;

      var link = getLinkForFilter(reqType, reqCategory, reqYear, reqQuality, reqPage);
      window.location.href = link;
    }
  });
});