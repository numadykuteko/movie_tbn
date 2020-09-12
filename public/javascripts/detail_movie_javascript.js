
$(document).ready(function () {
  var selectionVideoLink;

  $(document).off("click", ".detail-episode").on("click", ".detail-episode", function() {
    if ($(this).hasClass("selection-episode")) return;
    $("#detailYoutubeView").attr("src", "");
    $("#detailVideoView").attr("src", "");
    
    $(".detail-episode").removeClass("selection-episode");
    $(this).addClass("selection-episode");
    
    selectionVideoLink = $(this).data("link");
    $("#detailViewName").html("Link " + ($(this).data("label")));
    $("#detailPlayArea").removeClass("d-none");

    if(selectionVideoLink.match(youtube_link_prefix)){
      $("#detailVideoView").hide();
      $("#detailYoutubeView").show();

      var youtubeId;
      if (selectionVideoLink.indexOf("v=") != -1) {
        youtubeId = selectionVideoLink.split('v=')[1];
      } else if (selectionVideoLink.indexOf("youtu.be/")) {
        youtubeId = selectionVideoLink.split('youtu.be/')[1];
      }

      if (youtubeId.indexOf("&") != -1) {
        youtubeId = youtubeId.substring(0, youtubeId.indexOf("&"));
      }

      $("#detailVideoView").hide();
      $("#detailYoutubeView").show();
      $("#detailYoutubeView").attr("src", "https://www.youtube.com/embed/"+youtubeId+"?autoplay=1");
    } else {
      $("#detailVideoView").show();
      $("#detailYoutubeView").hide();
      $("#detailVideoView").attr("src", selectionVideoLink);
    }

    goToByScroll("#detailPlayArea");
  });
});