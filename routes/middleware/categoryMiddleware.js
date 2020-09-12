var baseResponse = require('../tools/response');
var serverConnection = require('../../connection/serverConnection');
var sessionManager = require('../session/sessionManager');

module.exports = {
  getCategory: function(req, res, next) { 
    var listCategory = sessionManager.getCategoryList(req);

    if (listCategory == undefined || listCategory == null || listCategory.length == 0) {
      var successGet = function(result) {
        if (result.status == baseResponse.status.success) {
          res.listCategory = result.data;
          sessionManager.saveCategoryList(req, result.data);
          return next();
        } else {
          return baseResponse.returnErrorGetPage(res);
        }
      };
  
      var failGet = function(error) {
        return baseResponse.returnErrorGetPage(res);
      };
  
      serverConnection.templateGetFunction(serverConnection.getCategoryLink(), {}, successGet, failGet);
    } else {
      res.listCategory = listCategory;
      return next();
    }
  },
}