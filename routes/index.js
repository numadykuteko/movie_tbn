var express = require('express');
var router = express.Router();
var categoryMiddleware = require('./../routes/middleware/categoryMiddleware');
var serverConnection = require('../connection/serverConnection');
var baseResponse = require('./tools/response');
var sessionManager = require('./session/sessionManager');

const constant = require('../connection/config');
const config = require('../connection/config');

/* GET home page. */
router.get('/', [categoryMiddleware.getCategory], function(req, res, next) {
  var reqCategory;
  var reqCategoryId;
  var reqYear;
  var reqQuality;
  var reqType;
  var reqPage = req.query.page;
  if (reqPage == undefined || reqPage == null) reqPage = 1;
  var currentYear = new Date().getFullYear();
  var listYear = [];
  for (var i=0; i<config.maxYearDistance; i++) {
    listYear[i] = currentYear - i;
  }

  var listMovie = [];
  var myPage;
  var listCategory = res.listCategory;

  listCategory.forEach(category => {
    if (category.slug == reqCategory) {
      reqCategoryId = reqCategory.id;
    }
  });

  const successGet = function(result) {
    if (result.status == baseResponse.status.success) {
      myPage = result.myPage;
      listMovie = result.data;
      
      listMovie.forEach(movie => {
        movie.linkThumbnail = serverConnection.getImageLink(movie.thumbnailUrl);

        for (var j=0; j<listCategory.length; j++) {
          if (movie.genres == listCategory[j].id) {
            movie.categoryName = listCategory[j].name;
            break;
          }
        }
      });
      sessionManager.saveMovieList(req, listMovie);

      res.render('index', { title: 'Foxcorn TV',reqType: reqType, reqCategory: reqCategory, reqYear: reqYear, reqQuality: reqQuality, listCategory: listCategory, myPage: myPage, listMovie: listMovie, listYear: listYear, listQuality: config.listQuality });
    } else {
      return baseResponse.returnErrorGetPage(res);
    }
  }

  const failGet = function(error) {
    return baseResponse.returnErrorGetPage(res);
  };

  serverConnection.templateGetFunction(serverConnection.getMovieLink("", "", "", "", constant.perPage, reqPage), {}, successGet, failGet);
});

/* GET filter */
router.get('/filter', [categoryMiddleware.getCategory], function(req, res, next) {
  var reqCategory = req.query.genres;
  var reqCategoryId;
  var reqYear = req.query.year;
  var reqQuality = req.query.quality;
  var reqType = req.query.type;
  var reqPage = req.query.page;
  if (reqPage == undefined || reqPage == null) reqPage = 1;
  var currentYear = new Date().getFullYear();
  var listYear = [];
  for (var i=0; i<config.maxYearDistance; i++) {
    listYear[i] = currentYear - i;
  }
  if (reqYear != undefined && reqYear < currentYear - config.maxYearDistance) {
    return baseResponse.returnErrorGetPage(res);
  }
  
  var listMovie = [];
  var myPage;
  var listCategory = res.listCategory;

  listCategory.forEach(category => {
    if (category.slug == reqCategory) {
      reqCategoryId = category.id;
    }
  });

  const successGet = function(result) {
    if (result.status == baseResponse.status.success) {
      myPage = result.myPage;
      listMovie = result.data;
      
      listMovie.forEach(movie => {
        movie.linkThumbnail = serverConnection.getImageLink(movie.thumbnailUrl);

        for (var j=0; j<listCategory.length; j++) {
          if (movie.genres == listCategory[j].id) {
            movie.categoryName = listCategory[j].name;
            break;
          }
        }
      });
      sessionManager.saveMovieList(req, listMovie);

      res.render('index', { title: 'Foxcorn TV',reqType: reqType, reqCategory: reqCategory, reqYear: reqYear, reqQuality: reqQuality, listCategory: listCategory, myPage: myPage, listMovie: listMovie, listYear: listYear, listQuality: config.listQuality });

    } else {
      return baseResponse.returnErrorGetPage(res);
    }
  }

  const failGet = function(error) {
    return baseResponse.returnErrorGetPage(res);
  };

  serverConnection.templateGetFunction(serverConnection.getMovieLink(reqType, reqCategoryId, reqYear, reqQuality, constant.perPage, reqPage), {}, successGet, failGet);
});

module.exports = router;
