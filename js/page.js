// Generated by CoffeeScript 1.12.7
(function() {
  var bindListenerForEditHref, currentPage, filteredTags, generateRow, loadItems, packageFilterParam, requestForEmailRegistration, urlObject, urlString;

  currentPage = 0;

  filteredTags = [];

  urlString = window.location.href;

  urlObject = new URL(urlString);

  this.server = urlObject.searchParams.get('server');

  this.port = urlObject.searchParams.get('port');

  requestForEmailRegistration = function(email, modalSpan) {
    return registerEmail({
      mail: email
    }, function(result) {
      modalSpan.removeClass();
      if (result.code === 770) {
        modalSpan.addClass('text-primary');
        modalSpan.text('验证邮件已发送至您的邮箱');
      } else if (result.code === 771) {
        modalSpan.addClass('text-success');
        modalSpan.text('您已订阅过此文章列表');
      } else if (result.code === 772) {
        modalSpan.addClass('text-warning');
        modalSpan.text('已向您发送过邮件，请稍后再试');
      }
      return setTimeout(function() {
        return location.reload();
      }, 1500);
    });
  };

  loadItems = function(payload, container, btnPre, btnSuc, pageIndicator, filteredTagsSpan) {
    return listItems(payload, function(result) {
      var i, item, len, ref;
      filteredTagsSpan.empty();
      if (filteredTags.length === 0) {
        filteredTagsSpan.append('<kbd>all</kbd>');
      } else {
        filteredTagsSpan.append("<kbd>" + (filteredTags.join('</kbd> <kbd>')) + "</kbd>");
      }
      if (result['code'] === 704) {
        currentPage = result['object']['currentPage'];
        if (result['object']['isFirst']) {
          btnPre.attr('disabled', true);
        } else {
          btnPre.attr('disabled', false);
        }
        if (result['object']['isLast']) {
          btnSuc.attr('disabled', true);
        } else {
          btnSuc.attr('disabled', false);
        }
        pageIndicator.text(currentPage);
        container.empty();
        ref = result['object']['bookMarkItems'];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          container.append(generateRow(item));
        }
        bindListenerForEditHref();
        return window.scrollTo(0, 0);
      } else {
        if (result['code'] === 802) {
          container.empty();
          return container.append("<tr style='font-weight: 600; font-size: 14px'><td colspan='3'>无任何结果可供显示</td></tr>");
        }
      }
    });
  };

  bindListenerForEditHref = function() {
    return $('.editHref').click(function() {
      return showEditModal(this);
    });
  };

  packageFilterParam = function(rawVal, page) {
    filteredTags = rawVal.replace(/[， 、]/g, ',').split(',').map(function(e) {
      return e.trim();
    }).filter(function(e) {
      return e !== '';
    }).map(function(e) {
      return escape(e);
    });
    return {
      page: page,
      tag: filteredTags
    };
  };

  $(function() {
    var btnClear, btnFilter, btnModal, btnPre, btnSuc, container, filteredTagsStrong, inputModal, inputTags, pageIndicator, registerModal, spanModal;
    container = $('#tableBody');
    btnPre = $('.btnPre');
    btnSuc = $('.btnSuc');
    pageIndicator = $('.pageIndicator');
    btnFilter = $('#btnFilter');
    btnClear = $('#btnClear');
    inputTags = $('#filterByTags');
    filteredTagsStrong = $('#filteredTags');
    btnModal = $('#btnModal');
    inputModal = $('#modalInput');
    spanModal = $('#modalSpan');
    registerModal = $('#registerModal');
    $('#itemTable').stickyTableHeaders();
    registerModal.addClass('fade');
    registerModal.on('hidden.bs.modal', function() {
      inputModal.val('');
      spanModal.text('');
      return btnModal.removeAttr('disabled');
    });
    btnModal.click(function() {
      if (inputModal.val().trim().length !== 0) {
        btnModal.attr('disabled', true);
        return requestForEmailRegistration(inputModal.val().trim(), spanModal);
      }
    });
    btnPre.click(function() {
      return loadItems({
        page: currentPage - 2
      }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    btnSuc.click(function() {
      return loadItems({
        page: currentPage
      }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    loadItems({
      page: 0
    }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    btnFilter.click(function() {
      return loadItems(packageFilterParam(inputTags.val(), 0), container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    btnClear.click(function() {
      inputTags.val('');
      return btnFilter.trigger('click');
    });
    return getTags(function(result) {
      return new Awesomplete(document.getElementById('filterByTags'), {
        list: result['object'].map(function(e) {
          return unescape(e.trim());
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
          return this.input.value = before + text + ", ";
        },
        minChars: 1,
        maxItems: 5,
        autoFirst: true
      });
    });
  });

  generateRow = function(item) {
    var tagsBadges;
    tagsBadges = item['tag'].map(function(e) {
      return "<span class=\"badge badge-default\">" + (unescape(e['name'])) + "</span>";
    }).join('&nbsp;');
    return "<tr><td style='vertical-align: middle'>" + item['id'] + "</td><td style='vertical-align: middle'><a href='" + item['url'] + "'>" + (unescape(item['name'])) + "</a></td><td style='vertical-align: middle'>" + tagsBadges + "</td><td style='font-size: 14px; vertical-align: middle'><a href='javascript:;' class='editHref'><i class='fa fa-pencil fa-1'></i> 编辑</a></td></tr>";
  };

}).call(this);
