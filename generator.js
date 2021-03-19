$(document).ready(function () {
  $("#genform").submit(function (e) {
    e.preventDefault();
    var settings = {};
    var url = $("#csvurl").val();
    if ($("#customcss").val()) settings["css"] = $("#customcss").val();
    if ($("#rowfilter").val()) settings["rowfilter"] = $("#rowfilter").val();
    var resultUrl = window.location.href.replace("linkgenerator.html","") +
      "tableview/index.html?url=" +
      encodeURIComponent(url);
    resultUrl =
      resultUrl + "&settings=" + encodeURIComponent(JSON.stringify(settings));
    $("#result").val(resultUrl);
    $("#finalurl").attr("href", resultUrl);
    $("#finalurl").text(resultUrl);
  });
});
