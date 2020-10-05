var express = require('express');
var router = express.Router();
var categoryMiddleware = require('./../routes/middleware/categoryMiddleware');
var serverConnection = require('../connection/serverConnection');
var baseResponse = require('./tools/response');
var sessionManager = require('./session/sessionManager');

const constant = require('../connection/config');
const config = require('../connection/config');

/* GET detail page. */
router.get('/:reqMovieSlug', [categoryMiddleware.getCategory], function(req, res, next) {
  var oldListMovie = sessionManager.getMovieList(req);

  var reqMovieSlug = req.params.reqMovieSlug;

  if (oldListMovie == undefined || oldListMovie == null || oldListMovie.length == 0) {
    getMovieFromServer(req, res, reqMovieSlug);
  } else {
    var selectionMovie = null;
    
    oldListMovie.forEach(movie => {
      if (movie.slug == reqMovieSlug) {
        selectionMovie = movie;
      }
    });

    if (selectionMovie != null) {
      startHandleMovie(req, res, selectionMovie);
    } else {
      getMovieFromServer(req, res, reqMovieSlug);
    }
  }
});

var getMovieFromServer = function(req, res, reqMovieSlug) {
  const successGet = function(result) {
    if (result.status == baseResponse.status.success) {
      listMovie = result.data;
      var selectionMovie = null;
      
      listMovie.forEach(movie => {
        if (movie.slug == reqMovieSlug) {
          selectionMovie = movie;
        }
      });

      if (selectionMovie != null) {
        startHandleMovie(req, res, selectionMovie);
      } else {
        return baseResponse.returnErrorGetPage(res);
      }
    } else {
      return baseResponse.returnErrorGetPage(res);
    }
  }

  const failGet = function(error) {
    return baseResponse.returnErrorGetPage(res);
  };

  serverConnection.templateGetFunction(serverConnection.detailMovieLink(reqMovieSlug), {}, successGet, failGet);
}

var startHandleMovie = function(req, res, selectionMovie) {
  selectionMovie.linkThumbnail = serverConnection.getImageLink(selectionMovie.thumbnailUrl);
  selectionMovie.linkPoster = serverConnection.getImageLink(selectionMovie.posterUrl);

  for (var j=0; j<res.listCategory.length; j++) {
    if (selectionMovie.genres == res.listCategory[j].id) {
      selectionMovie.categoryName = res.listCategory[j].name;
      selectionMovie.categorySlug = res.listCategory[j].slug;
      break;
    }
  }

  if (selectionMovie.isTvseries == 1) {
    serverConnection.templateGetFunction(serverConnection.getSeasonLink(selectionMovie.id), {}, 
    function(result) {
      if (result.status == baseResponse.status.success) {
        var listSeasons = result.data;
        res.render('detail_series', { title: selectionMovie.title, selectionMovie: selectionMovie, listSeasons: listSeasons, domain: config.domain });
        
      } else {
        res.render('detail_series', { title: selectionMovie.title, selectionMovie: selectionMovie, listSeasons: [], domain: config.domain });
      }
    },
    function(error) {
      return baseResponse.returnErrorGetPage(res); 
    });

  } else {
    serverConnection.templateGetFunction(serverConnection.getVideoLink(selectionMovie.id), {}, 
    function(result) {
      if (result.status == baseResponse.status.success) {
        var listVideos = result.data;
        res.render('detail_movie', { title: selectionMovie.title, selectionMovie: selectionMovie, listVideos: listVideos, domain: config.domain });
        
      } else {
        res.render('detail_movie', { title: selectionMovie.title, selectionMovie: selectionMovie, listVideos: [], domain: config.domain });
      }
    },
    function(error) {
      return baseResponse.returnErrorGetPage(res); 
    });
  }
}

router.get("/", function(req, res, next) {
  baseResponse.returnWrongGET(res);
});

router.post("/season", function(req, res, next) {
  var seasonId = req.body.id;
  if (seasonId == null || seasonId == undefined || seasonId.length == 0) {
    return baseResponse.returnWrongPOST(res);
  }

  serverConnection.templateGetFunction(serverConnection.getEpisodeLink(seasonId), {}, 
    function(result) {
      if (result.status == baseResponse.status.success) {
        var listEpisodes = result.data;
        if (listEpisodes != null && listEpisodes != undefined && listEpisodes.length > 0) {

          return baseResponse.returnDataPOST(res, listEpisodes);
        } else {
          return baseResponse.returnWrongPOST(res);
        }
      } else {
        return baseResponse.returnWrongPOST(res);
      }
    },
    function(error) {
      return baseResponse.returnWrongPOST(res);
    });
});

module.exports = router;
