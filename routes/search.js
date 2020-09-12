var express = require('express');
var router = express.Router();
var categoryMiddleware = require('./../routes/middleware/categoryMiddleware');
var serverConnection = require('../connection/serverConnection');
var baseResponse = require('./tools/response');

const constant = require('../connection/config');
const config = require('../connection/config');
const textHandler = require('./tools/text');

/* GET home page. */
router.get('/', [categoryMiddleware.getCategory], function(req, res, next) {
  var reqKeyword = req.query.keyword;
  var reqPage = req.query.page;
  if (reqPage == undefined || reqPage == null) reqPage = 1;

  if (reqKeyword == undefined || reqKeyword.length == 0) {
    return baseResponse.returnWrongGET(res);
  }

  reqKeyword = textHandler.escapeHTML(reqKeyword);

  var listMovie = [];
  var myPage;
  var listCategory = res.listCategory;

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
      res.render('search', { title: 'Search anime', myPage: myPage, listMovie: listMovie, reqKeyword: reqKeyword, reqPage: reqPage});

    } else {
      return baseResponse.returnErrorGetPage(res);
    }
  }

  const failGet = function(error) {
    return baseResponse.returnErrorGetPage(res);
  };

  serverConnection.templateGetFunction(serverConnection.searchMovieLink(reqKeyword, reqPage, constant.perPage), {}, successGet, failGet);
});

module.exports = router;
