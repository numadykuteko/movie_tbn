var selectionSeasonId;
var selectionSeasonName;
var episodeList;

var getEpisodeForSeason = function() {
  startLoading();

  $("#detailEpisodeList").html("");
  $("#detailEpisodeList").removeClass("d-flex");
  $("#detailEpisodeList").addClass("d-none");
  $("#detailEpisodeEmpty").addClass("d-none");

  $.ajax({
    url: "/detail/season",
    type: "POST",
    crossDomain: true,
    dataType: "json",
    timeout: connect_timeout,

    data: {
      id: selectionSeasonId,
    },
    cache: false,
    success:function(result){
      if (result.status == success_code) {
        episodeList = result.data;
        showEpisodeList();
      } else {
        showEmptyEpisodeList();
      }
    },
    error: function(error){
      showEmptyEpisodeList();
    },
    complete: function() {
      endLoading();
    }
  });
}

var showEmptyEpisodeList = function() {
  $("#detailEpisodeList").html("");
  $("#detailEpisodeList").removeClass("d-flex");
  $("#detailEpisodeList").addClass("d-none");
  $("#detailEpisodeEmpty").removeClass("d-none");

  callOnClick("#detailEpisodeReload", function(element) {
    getEpisodeForSeason();
  });
}

var showEpisodeList = function() {
  if (episodeList == null || episodeList == undefined || episodeList.length == 0) {
    showEmptyEpisodeList();
  } else {  
    $("#detailEpisodeEmpty").addClass("d-none");
    $("#detailEpisodeList").addClass("d-flex");
    
    var index = 0;
    episodeList.forEach(episode => {
      $("#detailEpisodeList").append(
        '<div class="cursor-pointer detail-episode mr-3 mb-3 select-video-to-play" data-index=' + index + '>'+
        '<img class="detail-episode-avatar h-100 w-auto" src="' + imageLink + '">'+
        '<span class="detail-episode-name text-small">Ep. ' + episode.episodesName + '</span></div>');
        index++;
    });

    $(document).off("click", ".detail-episode").on("click", ".detail-episode", function() {
      $("#detailYoutubeView").attr("src", "");
      $("#detailVideoView").attr("src", "");

      $(".detail-episode").removeClass("selection-episode");
      $(this).addClass("selection-episode");
      var index = $(this).data("index");
      var selectionEpisode = episodeList[index];
      if (selectionEpisode != null && selectionEpisode != undefined) {
        var selectionVideoLink = selectionEpisode.fileUrl;
        $("#detailViewName").html(selectionSeasonName + " - Ep. " + selectionEpisode.episodesName);
        $("#detailPlayArea").removeClass("d-none");
        
        if(selectionVideoLink.match(youtube_link_prefix)){
          var youtubeId;
          if (selectionVideoLink.indexOf("v=") != -1) {
            youtubeId = selectionVideoLink.split('v=')[1];
          } else if (selectionVideoLink.indexOf("youtu.be/")) {
            youtubeId = selectionVideoLink.split('"youtu.be/')[1];
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
      }
    });
  }
}

$(document).ready(function () {

  selectionSeasonId =  $('#detailSeasonList option:selected').val();
  selectionSeasonName = $('#detailSeasonList option:selected').data("name");

  getEpisodeForSeason();

  $(document).off("change", "#detailSeasonList").on("change", "#detailSeasonList", function() {
    var id = $('#detailSeasonList option:selected').val();
    if (id != selectionSeasonId) {
      selectionSeasonId = id;
      selectionSeasonName = $('#detailSeasonList option:selected').data("name");

      getEpisodeForSeason();
    }
  });
});