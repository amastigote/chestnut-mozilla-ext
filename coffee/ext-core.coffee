@create = (item, success_callback) ->
  general_query JSON.stringify(item), 'item', 'POST', success_callback

@update = (item, success_callback) ->
  general_query JSON.stringify(item), 'item', 'PUT', success_callback

@remove = (item, success_callback) ->
  general_query JSON.stringify(item), 'item', 'DELETE', success_callback

@get_item = (item, success_callback) ->
  general_query item, 'item', 'GET', success_callback

@get_tags = (tag_serial, success_callback) ->
  general_query tag_serial, 'tag', 'GET', success_callback

general_query = (item, urlEndPoint, query_method, success_callback) ->
  browser.storage.local.get([
    'cnServer'
    'cnPort'
  ]).then (result) ->
    if result['cnServer'] != undefined and result['cnPort'] != undefined
      server = result['cnServer']
      port = result['cnPort']
      $.ajax
        type: query_method
        url: 'https://' + server + ':' + port + '/' + urlEndPoint
        data: item
        contentType: 'application/json'
        dataType: 'json'
        crossDomain: true
        crossOrigin: true
        success: success_callback
        error: (request, status) ->
# todo