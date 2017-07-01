// C L I E N T E
$(document).ready(function() {
var tabIDs;
  $('#conectNginx').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: "/folder",
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        alert(data.stdout);
        $('#mensagem').text(data.stdout);
        $(data).find("a:contains(.config)").each(function() {
          // will loop through
          alert("Found a file: " + $(data.stdout).attr("href"));
          console.log(data);

        });
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conect',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#knobconections").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 3000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemtotal',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memtotal").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 3000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemfree',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memfree").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 3000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemavail',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memavail").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 2000);

  $('#createHost').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/host',
      data: JSON.stringify({
        'host': $('#host').val(),
        'port': $('#port').val(),
        'destination': $('#destination').val(),
        'cache': $('#cache').is(':checked'),
        'proxy': $('#destination').val()
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  $('#testNginx').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/nginx/test',
      data: {},
      success: function(data) {
        console.log(data);
        alert('Teste. ' + data.stdout);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  $('#reloadNginx').on('click', function() {
    $.ajax({
      type: 'POST',
      url: '/nginx/reload',
      data: {},
      success: function(data) {
        console.log(data);
        //console.log(data.message);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });



  var button = '<button class="close" type="button" title="Remove this page">&nbsp× </button>';
  var tabID = 1;

  function resetTab() {
    var tabs = $("#tab-list li:not(:first)");
    var len = 1
    $(tabs).each(function(k, v) {
      len++;
      $(this).find('a').html('Configuração ' + len + button);
    })
    tabID--;
  }

  $('#btn-add-tab').click(function() {
    tabID++;
    console.log(tabID);
    tabIDs = tabID;
    $('#tab-list').append(
      $('<li><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Configuração ' + tabID + '<button class="close" type="button" title="Remove this page">×</button></a></li>'));
    $('#tab-content').append(
      $('<div class="tab-pane fade" id="tab' + tabID + '"><h3>Configuração ' + tabID + '</h3><p>' + '</p><div class="form-group"><label for="host">Host:</label><input type="text" class="form-control" id="hosts" value="xpto' + tabID + '.pt"></div><div class="form-group"><label for="port">Port:</label><input type="text" class="form-control" id="ports" value="80"></div><div class="form-group"><label for="destination">Destination:</label><input type="text" class="form-control" id="destinations" value="http://127.0.0.1:3000"></div><div class="checkbox"><label><input type="checkbox" id="caches"> Static assets cache</label></div></div>'));
  });
  $('#tab-list').on('click', '.close', function() {

    var tabID1 = $(this).parents('a').attr('href');
    console.log(tabID-1);
    tabIDs  = tabID -1;
    $(this).parents('li').remove();
    $(tabID1).remove();
    //display first tab
    var tabFirst = $('#tab-list a:first');
    resetTab();
    tabFirst.tab('show');
  });

  var list = document.getElementById("tab-list");

    $('#createHosts').click(function(req, res) {
        var portss;
        var destinationss;
        var hostss;
        var cachess;
        for (i=1;i<=JSON.stringify(tabIDs);i++){

          portss = '#ports' + i;
          destinationss = '#destinations' + i;
          hostss = '#hosts' + i;
          cachess = '#caches' + i;
      $.ajax({
        type: 'POST',
        url: '/hosts',
        data: JSON.stringify({
          'host': $(hostss).val(),
          'port': $(portss).val(),
          'destination': $(destinationss).val(),
          'cache': $(cachess).is(':checked')
        }),
        success: function(data) {
          console.log(data);
        },
        dataType: 'json',
        contentType: 'application/json'
    });
  };
    });
});
