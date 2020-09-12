const config = require("./config");
const constant = config.constant;
const axios = require('axios');

module.exports = {
  getCategoryLink: function() {
    return constant.server_data + constant.genre;
  },

  getMovieLink: function(type, category, year, quality, pageSize, pageIndex) {
    var link = constant.server_data + constant.movie + "/search?filter=";
    if (category == null || category == undefined || category == "") {
      link += "genres=='**'";
    } else {
      link += "genres=='*" + category + "*'";
    }

    if (type == null || type == undefined || type == "") {
      link += "";
    } else if (type == config.typeMovieText) {
      link += ";isTvseries==0";
    } else if (type == config.typeSeriesText) {
      link += ";isTvseries==1";
    }

    if (type == null || type == undefined || type == "") {
      link += "";
    } else if (type == 1) {
      link += ";isTvseries==1";
    } else if (type == 2) {
      link += ";isTvseries==1";
    }

    if (year == null || year == undefined || year == "") {
      link += "";
    } else {
      link += ";releaseDate=='*" + year + "*'";
    }

    if (quality == null || quality == undefined || quality == "") {
      link += "";
    } else {
      link += ";videoQuality=='*" + quality + "*'";
    }

    link += "&pageIndex=" + (pageIndex-1) + "&pageSize=" +  pageSize + "&sort=-releaseDate";

    return link;
  },

  searchMovieLink: function(keyword, pageIndex, pageSize) {
    var link = constant.server_data + constant.movie + "/search?filter=";
    link += "title=='*" + keyword + "*'";
    link += "&pageIndex=" + (pageIndex-1) + "&pageSize=" +  pageSize + "&sort=-releaseDate";

    return link;
  },

  getImageLink: function(imageLink) {
    return config.constant.server_image + imageLink;
  },

  detailMovieLink: function(slug) {
    var link = constant.server_data + constant.movie + "/search?filter=";
    link += "slug=='*" + slug + "*'";
    link += "&pageIndex=0&pageSize=10000&sort=-releaseDate";

    return link;
  },

  getSeasonLink: function(seriesId) {
    var link = constant.server_data + constant.season + "/search?filter=";
    link += "movieId=='*" + seriesId + "*'";
    link += "&pageIndex=0&pageSize=10000&sort=seasonsName";

    return link;
  },

  getEpisodeLink: function(seasonId) {
    var link = constant.server_data + constant.episode + "/search?filter=";
    link += "seasonId=='*" + seasonId + "*'";
    link += "&pageIndex=0&pageSize=10000&sort=episodesId";

    return link;
  },
  
  getVideoLink: function(movieId) {
    var link = constant.server_data + constant.video + "/search?filter=";
    link += "movieId=='*" + movieId + "*'";
    link += "&pageIndex=0&pageSize=10000&sort=label";

    return link;
  },

  templateGetFunction: function(command, param, success, fail) {
    axios({
      method: 'GET',
      url: encodeURI(command),

      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      param: param,
      withCredentials: true,
      timeout: 10000,
    })  
    .then(function(response) {
      console.log("\nurl: ");
      console.log(command);
      console.log("\ninput: ");
      console.log(param);
      console.log("\noutput: ");     
      console.log(response.data); 
      success(response.data);
    })
    .catch(function (error) {
      console.log("\nurl: ");
      console.log(command);
      console.log("\ninput: ");
      console.log(param);
      console.log("\noutput: ");     
      console.log(error);      
      fail(error);
    });
  }
}