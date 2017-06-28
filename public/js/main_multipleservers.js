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
  // Valores para informação de Dash
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
        //alert('Teste. ' + data.stdout);
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

  //Load Balancer - Adicionar e Remover novos Campos
  $('#addFields').on('click', function() {
      var number = 2; //document.getElementById("member").value;
      var container = document.getElementById("conteudo");
      while (container.hasChildNodes()) {
          container.removeChild(container.lastChild);
      }
      for (i=0;i<number;i++){
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createTextNode("Server " + (i + 1) + ": ")); //document.createTextNode("Member "
        var input = document.createElement("input");
        input.type = "text";
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
      }
  });

  // Multiplos VHOST'S
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
      $('<div class="tab-pane fade" id="tab' + tabID + '"><form id="teste"><p>' + '</p><div class="form-group"><label for="host">Host:</label><div class="form-input"><input type="text" class="form-control" id="host' + tabID + '" value="xpto' + tabID + '.pt" name="host"></div></div><div class="form-group"><label for="port">Port:</label><div class="form-input"><input type="text" class="form-control" id="port' + tabID + '" value="80"></div></div><div class="form-group"><label for="destination">Destination:</label><div class="form-input"><input type="text" class="form-control" id="destination' + tabID + '" value="http://127.0.0.1:300' + tabID + '"></div></div><div class="checkbox"><label><div class="form-input"><input type="checkbox" id="cachemv' + tabID + '"> Static assets cache</div></label></div></form></div>'));
  });
  $('#tab-list').on('click', '.close', function() {

    var tabID1 = $(this).parents('a').attr('href');
    console.log(tabID - 1);
    tabIDs = tabID - 1;
    $(this).parents('li').remove();
    $(tabID1).remove();
    //display first tab
    var tabFirst = $('#tab-list a:first');
    resetTab();
    tabFirst.tab('show');
  });

  var list = document.getElementById("tab-list");

  $("#createHosts").button().on("click", function() {
    printCalc()
  })

  function printCalc() {
    var count = 0;
    //Nº de valores dentro do array

    $("#tabs").each(function() {
      //$(this).find(".nav-tabs li").each(function(index, element) {
      count = 0;
      conta = 1;
      var valor1;
      var valor2;
      var valor3;
      var valor5;
      $("form#teste input").each(function(index, element) {
        if (conta == 1) {
          a = $(this).val();
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor1 = a;
        } else if (conta == 2) {
          a = $(this).val();
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor2 = a;
        } else if (conta == 3) {
          a = $(this).val();
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor3 = a;
        } else if (conta == 4) {
          a = $(this).is(':checked');
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor4 = a;
        };
        conta = conta + 1;
        if (conta > 4) {
          conta = 1;
          $.ajax({
            type: 'POST',
            url: '/host',
            data: JSON.stringify({
              'host': valor1,
              'port': valor2,
              'destination': valor3,
              'cache': $(this).is(':checked'),
              'proxy': valor3
            }),
            success: function(data) {
              console.log(data);
            },
            dataType: 'json',
            contentType: 'application/json'
          });
        };
        count = count + 1;
      });
    });
  };
  });
