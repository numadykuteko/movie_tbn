module.exports = {
  error: {need_login: -500, need_permission: -400, wrong_post: -300, error_connect_server: -200 },
  success: {ok: 200},
  status: {success: "Success", fail: "fail"},

  returnDataPOST: function(res, result) {
    console.log("\nto client: ");   
    console.log(result);   
    res.send({status: this.success.ok, data: result});
  },

  returnSuccessPOST: function(res) {
    res.send({status: this.success.ok});
  },

  returnNeedSignInPOST: function(res) {
    res.send({status: this.error.need_login});
  },

  returnNeedPermissionPOST: function(res) {
    res.send({status: this.error.need_permission});
  },

  returnWrongGET: function(res) {
    res.redirect("/");
  },

  returnWrongPOST: function(res) {
    res.send({status: this.error.wrong_post});
  },

  returnErrorConnect: function(res) {
    res.send({status: this.error.error_connect_server});
  },

  returnByType: function(req, res, message) {
    if (req.method == "POST") {
      console.log("\nto client: "+message);   
      res.send({status: message});
    } else {
      this.returnWrongGET(res);
    }
  },

  returnErrorGetPage: function(res) {
    res.render( 'error_page', {message: "¡Ups! Algo salió mal."});
  }
}