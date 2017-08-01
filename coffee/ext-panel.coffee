add_btn = $('#btn_add')
update_btn = $('#btn_update')
delete_btn = $('#btn_delete')
browse_btn = $('#img_page')
settings_btn = $('#btn_settings')
title_input = $('#input_title')
url_input = $('#input_url')
tag_input = $('#input_tag')
img_settings = $('#img_settings')

mask = $('#mask')
mask.css 'height', $(document).height()
mask.css 'width', $(document).width()

browser.storage.local.get('tags').then (result) ->
  if result['tags'] == undefined
    result = tags: []

  new Awesomplete(document.getElementById('input_tag'),
    list: result.tags.map((e) ->
      unescape e
    )
    filter: (text, input) ->
      Awesomplete.FILTER_CONTAINS text, input.match(/[^,]*$/)[0]
    item: (text, input) ->
      Awesomplete.ITEM text, input.match(/[^,]*$/)[0]
    replace: (text) ->
      before = @input.value.match(/^.+,\s*|/)[0]
      @input.value = before + text + ', '

    minChars: 1
    maxItems: 2
    autoFirst: true)

browse_btn.click ->
  browser.storage.local.get([
    'cnServer'
    'cnPort'
  ]).then (result) ->
    browser.tabs.create 'url': '/page/html/page.html?server=' + result['cnServer'] + '&port=' + result['cnPort']
    window.close()

add_btn.click ->
  mask.fadeIn()
  add_btn.prop 'disabled', true
  create collect_item(), ->
    mask.fadeOut()
    update_btn.prop 'disabled', false
    delete_btn.prop 'disabled', false
    browser.tabs.query(
      currentWindow: true
      active: true).then (tabs) ->
        if tabs[0]
          update_icon true, tabs[0].id

update_btn.click ->
  mask.fadeIn()
  update_btn.prop 'disabled', true
  update collect_item(), ->
    mask.fadeOut()
    update_btn.prop 'disabled', false

delete_btn.click ->
  mask.fadeIn()
  delete_btn.prop 'disabled', true
  remove collect_item(), ->
    mask.fadeOut()
    add_btn.prop 'disabled', false
    update_btn.prop 'disabled', true
    browser.tabs.query(
      currentWindow: true
      active: true).then (tabs) ->
        if tabs[0]
          update_icon false, tabs[0].id

img_settings.click ->
  browser.runtime.openOptionsPage()
  window.close()

settings_btn.click ->
  browser.runtime.openOptionsPage()
  window.close()

update_icon = (hasColor, tabId) ->
  browser.browserAction.setIcon
    path: if hasColor then 48: '../pic/cn_1.png' else 48: '../pic/cn_0.png'
    tabId: tabId

collect_item = ->
  {
    name: escape(title_input.val())
    url: url_input.val()
    tag: tag_input.val().replace(new RegExp('，', 'g'), ',').split(',').map((e) ->
      e.trim()
    ).filter((e) ->
      e != ''
    ).map((e) ->
      escape e
    )
    auto_add_tag: true
  }

browser.tabs.query(
  currentWindow: true
  active: true).then (tabs) ->
    if tabs[0]
      url = tabs[0].url
      title_input.val removeSuffix(url, tabs[0].title)
      url_input.val url
      get_item { url: url_input.val() }, (result) ->
        if result.code == 700
          mask.fadeOut()
          add_btn.prop 'disabled', true
          title_input.val unescape(result.object.name)
          tag_input.val result.object.tag.map((e) ->
            unescape e.name
          ).join(', ')
        else if result.code == 800
          mask.fadeOut()
          update_btn.prop 'disabled', true
          delete_btn.prop 'disabled', true
