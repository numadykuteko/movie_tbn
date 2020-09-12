module.exports = {
  saveCategoryList: function(req, listCategory) {
    req.session.listCategory = listCategory;
  },

  getCategoryList: function(req) {
    return req.session.listCategory;
  },

  saveMovieList: function(req, listMovie) {
    var oldListMovie = this.getMovieList(req);

    if (oldListMovie == undefined || oldListMovie == null || oldListMovie.length == 0) {
      req.session.listMovie = listMovie;
    } else {
      listMovie.forEach(movie => {
        if (oldListMovie.indexOf(movie) == -1) {
          oldListMovie.push(movie);
        }
      });
      req.session.listMovie = oldListMovie;
    }
  },

  getMovieList: function(req) {
    return req.session.listMovie;
  }
};