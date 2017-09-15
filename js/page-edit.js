// Generated by CoffeeScript 1.12.7
(function() {
  var categorySltModal, collectItem, currentRow, editModal, removeBtnModal, submitBtnModal, tagsInputModal, titleInputModal, urlInputModal;

  titleInputModal = $('#modalInputTitle');

  urlInputModal = $('#modalInputUrl');

  tagsInputModal = $('#modalInputTags');

  removeBtnModal = $('#editModalBtnRemove');

  submitBtnModal = $('#editModalBtnSubmit');

  categorySltModal = $('#modalSelectCategory');

  currentRow = null;

  editModal = $('#editModal');

  editModal.on('hidden.bs.modal', function() {
    titleInputModal.val('');
    urlInputModal.val('');
    return tagsInputModal.val('');
  });

  this.showEditModal = function(p0, p1) {
    var e, i, itemHtml, j, len, selectedCategory, spans, tags, title, url;
    selectedCategory = p0.getAttribute('itemprop');
    get_tags(function(result) {
      var extractLast, split;
      split = function(val) {
        return val.split(/,\s*/);
      };
      extractLast = function(term) {
        return split(term).pop();
      };
      return $('#modalInputTags').autocomplete({
        minLength: 1,
        source: function(request, response) {
          return response($.ui.autocomplete.filter(result['obj'].map(function(e) {
            return escapeChars(unescape(e.trim()));
          }), extractLast(request.term)));
        }
      }, {
        focus: function() {
          return false;
        },
        select: function(event, ui) {
          var terms;
          terms = split(this.value);
          terms.pop();
          terms.push(ui.item.value);
          terms.push("");
          this.value = terms.join(", ");
          return false;
        }
      });
    });
    currentRow = p0.closest('tr');
    title = currentRow.childNodes[1].childNodes[0].text;
    url = currentRow.childNodes[1].childNodes[0].getAttribute('href');
    spans = currentRow.childNodes[2].childNodes;
    if (spans.length === 0) {
      tags = '';
    } else {
      tags = ((function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = spans.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if ($(spans.item(i).childNodes[0]).is('span')) {
            results.push($(spans.item(i)).text());
          }
        }
        return results;
      })()).join(', ');
    }
    categorySltModal.empty();
    for (j = 0, len = p1.length; j < len; j++) {
      e = p1[j];
      itemHtml = "<option>" + e + "</option>";
      if (e === selectedCategory) {
        itemHtml = $($.parseHTML(itemHtml)).prop('selected', 'selected');
      }
      categorySltModal.append(itemHtml);
    }
    titleInputModal.val(title);
    urlInputModal.val(url);
    tagsInputModal.val(tags);
    return editModal.modal({
      show: true
    });
  };

  submitBtnModal.click(function() {
    return update(collectItem(), function(result) {
      if (result['stat'] === Status.COMPLETE) {
        return location.reload();
      }
    });
  });

  removeBtnModal.click(function() {
    return remove(collectItem(), function(result) {
      if (result['stat'] === Status.COMPLETE) {
        return location.reload();
      }
    });
  });

  collectItem = function() {
    return {
      title: escape(titleInputModal.val().trim()),
      url: urlInputModal.val().trim(),
      tags: tagsInputModal.val().replace(/[， 、]/g, ',').split(',').map(function(e) {
        return e.trim();
      }).filter(function(e) {
        return e !== '';
      }).map(function(e) {
        return escape(e);
      }),
      categoryName: escape(categorySltModal.children(":selected").text())
    };
  };

}).call(this);
