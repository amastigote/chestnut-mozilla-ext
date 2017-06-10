// Generated by CoffeeScript 1.12.6
(function() {
  this.removeItem = function(payload, successCallback) {
    return generalQuery(payload, 'item', 'DELETE', successCallback);
  };

  this.getTags = function(payload, successCallback) {
    return generalQuery(payload, 'tag', 'GET', successCallback);
  };

  this.listItems = function(payload, successCallback) {
    return generalQuery(payload, 'item/list', 'GET', successCallback);
  };

  this.generalQuery = function(payload, URLEndPoint, queryMethod, successCallback) {
    return $.ajax({
      type: queryMethod,
      url: "https://localhost:8443/" + URLEndPoint,
      data: payload,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      success: successCallback,
      crossOrigin: true,
      error: function(request, status) {}
    });
  };

}).call(this);
