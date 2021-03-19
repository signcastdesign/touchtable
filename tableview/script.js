$(document).ready(function () {
  var url = new URL(window.location.href);
  var fetchurl = url.searchParams.get("url");
  //console.log(fetchurl);
  var settings = url.searchParams.get("settings");
  settings = JSON.parse(settings);
  //console.log(settings);
  $('<style>').text(settings.css).appendTo(document.head);
  $.fn.dataTable.ext.errMode = "none";
  $("#dataview").on("error.dt", function (e, settings, techNote, message) {
    console.log("An error has been reported by DataTables: ", message);
  });
  if(settings.rowfilter){
    var pl = parseInt(settings.rowfilter);
  }
  else{
    pl = 10;
  }
  var jsondata;
  console.log(pl);
  Papa.parse(fetchurl, {
    download: true,
    complete: function (results) {
      jsondata = results;
      for (var i = 0; i < jsondata["data"][0].length; i++) {
        $("#tablehead tr").append("<td>" + jsondata["data"][0][i] + "</td>");
      }
      jsondata["data"] = jsondata["data"].slice(1);
      var table = $("#dataview")
        .on("init.dt", function () {
          $('input[type="search"]').keyboard({
            usePreview: false,
            change: function (e, kb) {
              table.search(kb.el.value).draw();
            },
          });
        })
        .DataTable(jsondata);
        table.page.len(pl).draw();
    },
  });
});
