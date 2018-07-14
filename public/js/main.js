// definition here so that it can be referenced
var saveChanges;
var dirty = false;
var dailyTitle = "";

$(document).ready(function() {
  // Get the contents for today's daily
  var getDailyFromDate = function(date) {
    dirty = false;
    dailyTitle = "";

    $.get({
      url: "/daily/" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(),
      datatype: "json",
      success: function(data, err) {
        console.log("Successfully got daily for", date);
        if (data) {
          // set the title
          var titleLabel = (data.title) ? data.title : "Untitled";
          $("#daily-title-label").val(titleLabel);
          if (!data.title) {
            $("#daily-title-label").addClass("untitled");
          }
          else {
            dailyTitle = data.title;
          }
          // set the editor
          settingInitialEditorContents(JSON.parse(data.content));
          editor.on('text-change', function(delta) {
            change = change.compose(delta);
            // change label if it wasn't dirty
            if (!dirty) {
              var titleLabel = dailyTitle ? dailyTitle : "Untitled";
              $("#daily-title-label").val("*" + titleLabel);
            }
            dirty = true;
          });
        }
        else {
          var titleLabel = "Untitled";
          $("#daily-title-label").val(titleLabel);
          $("#daily-title-label").addClass("untitled");
          settingInitialEditorContents(""); // empty contents
        }
        change = new Delta(); // change is initialized below
      },
      error: function(err) {
        console.log("Failed to get daily for", date);
        console.log(err);
      }
    });
  };

  // Hacky way to set contents. The dirty flag makes sure that
  // the initial setting is already considered dirty, so there
  // is no need to prefix the title with *.
  var settingInitialEditorContents = function(contents) {
    dirty = true;
    editor.setContents(contents);
    dirty = false;
  };

  // Load the date picker
  var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    onSelect: getDailyFromDate,
    firstDay: 1,
    maxDate: new Date(2020, 12, 31),
    yearRange: [2000,2020],
  });
  picker.setDate(new Date());

  // Load the editor
  var Delta = Quill.import('delta');
  var editor = new Quill('#quill-editor', {
    placeholder: 'Write about your day',
    theme: 'snow',
  });

  // Store accumulated changes
  var change = new Delta();

  saveChanges = function() {
    var date = picker.getDate();
    var content = JSON.stringify(editor.getContents());
    var data = { content: content }
    if (!($("#daily-title-label").hasClass("untitled"))) {
      data.title = dailyTitle;
    }
    $.ajax({
      method: 'PUT',
      url: "/daily/" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(),
      contentType: 'application/json',
      data: JSON.stringify(data),
      datatype: "json",
      success: function(data, err) {
        console.log("Successfully saved daily");
        change = new Delta();
        $("#daily-title-label").val(dailyTitle);
        dirty = false;
        alert("Successfully saved daily");
      },
      error: function(err) {
        console.log("Failed to save daily");
        console.log(err);
        alert("Oops, failed to save daily...");
      }
    });
  };

  function cancelBubble(e) {
    var evt = e ? e:window.event;
    if (!evt) return;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
  }

  disableEditing = function() {
    editor.disable();
    $(".ql-toolbar").addClass("hide-toolbar");
    $(".ql-editor").removeClass("active");
    console.log("Disabled editing");
  };

  enableEditing = function() {
    editor.enable(true);
    $(".ql-toolbar").removeClass("hide-toolbar");
    $(".ql-editor").addClass("active");
    console.log("Enabled editing");
  };

  // start with the editor being disabled
  disableEditing();

  $("body").click(function(e) {
    cancelBubble(e);
    disableEditing(e);
  });

  $(".ql-editor").click(function(e) {
    cancelBubble(e);
    enableEditing(e);
  });

  $(".ql-toolbar").click(function(e) {
    cancelBubble(e); // prevent bubbling of click event to body, which disables editing
  });

  $("#daily-title-label").focus(function(e) {
    $(this).val(dailyTitle);
    $(this).addClass("active");
    if ($(this).hasClass("untitled")) {
      $(this).val("");
    }
  });

  $("#daily-title-label").blur(function(e) {
    $(this).removeClass("active");
    var prefix = dirty ? "*" : "";
    if ($(this).hasClass("untitled")) {
      $(this).val(prefix + "Untitled");
    }
    else {
      $(this).val(prefix + dailyTitle)
    }
  });

  $("#daily-title-label").on("input", function() {
    $(this).removeClass("untitled");
    dailyTitle = $(this).val();
  });
});