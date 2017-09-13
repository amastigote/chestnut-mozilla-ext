// Generated by CoffeeScript 1.12.7
(function() {
  var collectItemForCreateModal, collectItemForEditModal, createListItem, createModal, createModalCreateButton, createModalNameInput, editListItem, editModal, editModalCategorySelect, editModalDeleteButton, editModalNameInput, editModalSubmitButton;

  createModal = $('#add-category-modal');

  editModal = $('#edit-category-modal');

  createModalNameInput = $('#ac-modal-name-input');

  createModalCreateButton = $('#ac-modal-create-button');

  editModalSubmitButton = $('#ec-modal-submit-button');

  editModalDeleteButton = $('#ec-modal-delete-button');

  editModalCategorySelect = $('#ec-modal-category-select');

  editModalNameInput = $('#ec-modal-name-input');

  createListItem = $('#create-category-li');

  editListItem = $('#edit-category-li');

  createListItem.click(function(e) {
    e.preventDefault();
    createModal.modal({
      show: true
    });
    return false;
  });

  editListItem.click(function(e) {
    e.preventDefault();
    get_category(function(result) {
      var i, item, itemHtml, len, ref, results;
      ref = result['obj'];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        itemHtml = "<option>" + (unescape(item['name'])) + "</option>";
        results.push(editModalCategorySelect.append(itemHtml));
      }
      return results;
    });
    editModal.modal({
      show: true
    });
    return false;
  });

  createModal.on('hidden.bs.modal', function() {
    return createModalNameInput.val('');
  });

  editModal.on('hidden.bs.modal', function() {
    return editModalNameInput.val('');
  });

  editModalDeleteButton.click(function() {
    editModalCategorySelect.removeClass('border-danger');
    return remove_category(collectItemForEditModal(), function(result) {
      if (result['stat'] === Status.COMPLETE) {
        return location.reload();
      } else if (result['stat'] === Status.ERROR) {
        return editModalCategorySelect.addClass('border-danger');
      }
    });
  });

  editModalSubmitButton.click(function() {
    editModalNameInput.removeClass('border-danger');
    return update_category(collectItemForEditModal(), function(result) {
      if (result['stat'] === Status.COMPLETE) {
        editModalNameInput.addClass('border-success');
        return setTimeout(function() {
          editModalNameInput.val('');
          return location.reload();
        }, 500);
      } else if (result['stat'] === Status.ERROR) {
        return editModalNameInput.addClass('border-danger');
      }
    });
  });

  createModalCreateButton.click(function() {
    createModalNameInput.removeClass('border-danger');
    createModalCreateButton.prop('disabled', true);
    return create_category(collectItemForCreateModal(), function(result) {
      if (result['stat'] === Status.ERROR) {
        createModalNameInput.addClass('border-danger');
        return createModalCreateButton.prop('disabled', false);
      } else if (result['stat'] === Status.COMPLETE) {
        createModalNameInput.addClass('border-success');
        return setTimeout(function() {
          createModalNameInput.val('');
          return location.reload();
        }, 500);
      }
    });
  });

  collectItemForCreateModal = function() {
    return {
      name: escape(createModalNameInput.val().trim()),
      newName: ''
    };
  };

  collectItemForEditModal = function() {
    return {
      name: escape(editModalCategorySelect.children(":selected").text()),
      newName: escape(editModalNameInput.val().trim())
    };
  };

}).call(this);