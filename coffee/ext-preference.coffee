server_input = $('#input_server')
port_input = $('#input_port')
save_button = $('#buttonSave')
clear_button = $('#buttonClear')
github_button = $('#buttonGithub')

# we use independent key vars for that ext-core is not loaded in preference page
__serverKey = 'cnServer'
__portKey = 'cnPort'

#noinspection JSUnresolvedVariable
browser.storage.local.get([
  __serverKey
  __portKey
]).then (result) ->
  if result[__serverKey] and result[__serverKey] != ''
    server_input.val result[__serverKey]
  if result[__portKey] and result[__portKey] != ''
    port_input.val result[__portKey]

save_button.tooltip
  template: '<div class="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  title: '设置已保存'
  trigger: 'manual'
  placement: 'right'
save_button.click ->
  conf = {}
  conf[__serverKey] = server_input.val().trim()
  conf[__portKey] = port_input.val().trim()
  #noinspection JSUnresolvedVariable
  browser.storage.local.set conf
  save_button.tooltip 'show'
  setTimeout (->
    save_button.tooltip 'hide'
  ), 1000

clear_button.click ->
  server_input.val ''
  port_input.val ''

github_button.click ->
  window.open 'https://github.com/amastigote/amastigote-browser-ext'
