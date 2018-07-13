// definition here so that it can be referenced
var saveChanges;

$(document).ready(function() {
  // Get the contents for today's daily
  var getDailyFromDate = function(date) {
    $.get({
      url: "/daily/" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(),
      datatype: "json",
      success: function(data, err) {
        console.log("Successfully got daily for", date);
        if (data) {
          editor.setContents(JSON.parse(data.content));
        }
        else {
          editor.setContents(""); // empty contents
        }
        change = new Delta(); // change is initialized below
      },
      error: function(err) {
        console.log("Failed to get daily for", date);
        console.log(err);
      }
    });
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
  editor.on('text-change', function(delta) {
    change = change.compose(delta);
  });

  saveChanges = function() {
    if (change.length() > 0) {
      var date = picker.getDate();
      var content = JSON.stringify(editor.getContents());
      $.ajax({
        method: 'PUT',
        url: "/daily/" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(),
        contentType: 'application/json',
        data: JSON.stringify({ content: content }),
        datatype: "json",
        success: function(data, err) {
          console.log("Successfully saved daily");
          change = new Delta();
          disableEditing();
          alert("Successfully saved daily");
        },
        error: function(err) {
          console.log("Failed to save daily");
          console.log(err);
          alert("Oops, failed to save daily...");
        }
      });
    }
  };

  disableEditing = function() {
    editor.disable();
    $(".ql-toolbar").addClass("hide-toolbar");
  };

  enableEditing = function() {
    editor.enable(true);
    $(".ql-toolbar").removeClass("hide-toolbar");
  };
});