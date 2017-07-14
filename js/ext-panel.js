// Generated by CoffeeScript 1.12.6
(function() {
  var add_btn, browse_btn, collect_item, delete_btn, img_mail, img_settings, tag_input, title_input, update_btn, update_icon, url_input;

  add_btn = $('#btn_add');

  update_btn = $('#btn_update');

  delete_btn = $('#btn_delete');

  browse_btn = $('#img_page');

  title_input = $('#input_title');

  url_input = $('#input_url');

  tag_input = $('#input_tag');

  img_settings = $('#img_settings');

  img_mail = $('#img_mail');

  browser.storage.local.get('tags').then(function(result) {
    if (result['tags'] === void 0) {
      result = {
        tags: []
      };
    }
    return new Awesomplete(document.getElementById('input_tag'), {
      list: result.tags.map(function(e) {
        return unescape(e);
      }),
      filter: function(text, input) {
        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      },
      item: function(text, input) {
        return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      },
      replace: function(text) {
        var before;
        before = this.input.value.match(/^.+,\s*|/)[0];
        return this.input.value = before + text + ', ';
      },
      minChars: 1,
      maxItems: 2,
      autoFirst: true
    });
  });

  browse_btn.click(function() {
    return browser.storage.local.get(['cnServer', 'cnPort']).then(function(result) {
      browser.tabs.create({
        'url': '/amastigote-page/html/page.html?server=' + result['cnServer'] + '&port=' + result['cnPort']
      });
      return window.close();
    });
  });

  add_btn.click(function() {
    add_btn.prop('disabled', true);
    return create(collect_item(), function() {
      update_btn.prop('disabled', false);
      delete_btn.prop('disabled', false);
      delete_btn.css('color', '#c12e2a');
      return browser.tabs.query({
        currentWindow: true,
        active: true
      }).then(function(tabs) {
        if (tabs[0]) {
          return update_icon(true, tabs[0].id);
        }
      });
    });
  });

  update_btn.click(function() {
    update_btn.prop('disabled', true);
    return update(collect_item(), function() {
      return update_btn.prop('disabled', false);
    });
  });

  delete_btn.click(function() {
    delete_btn.prop('disabled', true);
    delete_btn.css('color', '#c68783');
    return remove(collect_item(), function() {
      add_btn.prop('disabled', false);
      update_btn.prop('disabled', true);
      return browser.tabs.query({
        currentWindow: true,
        active: true
      }).then(function(tabs) {
        if (tabs[0]) {
          return update_icon(false, tabs[0].id);
        }
      });
    });
  });

  img_settings.click(function() {
    browser.runtime.openOptionsPage();
    return window.close();
  });

  img_mail.click(function() {
    window.location.href = "mailto:?subject=Page shared from AMASTIGOTE&body=" + (title_input.val()) + ": " + (url_input.val());
    return window.close();
  });

  update_icon = function(hasColor, tabId) {
    return browser.browserAction.setIcon({
      path: hasColor ? {
        48: '../pic/cn_1.png'
      } : {
        48: '../pic/cn_0.png'
      },
      tabId: tabId
    });
  };

  collect_item = function() {
    return {
      name: escape(title_input.val()),
      url: url_input.val(),
      tag: tag_input.val().replace(new RegExp('，', 'g'), ',').split(',').map(function(e) {
        return e.trim();
      }).filter(function(e) {
        return e !== '';
      }).map(function(e) {
        return escape(e);
      }),
      auto_add_tag: true
    };
  };

  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function(tabs) {
    if (tabs[0]) {
      title_input.val(tabs[0].title);
      url_input.val(tabs[0].url);
      return get_item({
        url: url_input.val()
      }, function(result) {
        if (result.code === 700) {
          add_btn.prop('disabled', true);
          title_input.val(unescape(result.object.name));
          return tag_input.val(result.object.tag.map(function(e) {
            return unescape(e.name);
          }).join(', '));
        } else if (result.code === 800) {
          update_btn.prop('disabled', true);
          delete_btn.prop('disabled', true);
          return delete_btn.css('color', '#c68783');
        }
      });
    }
  });

}).call(this);