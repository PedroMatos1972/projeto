// C L I E N T E
$(document).ready(function() {
  var tabIDs;
  var arr = {};
  var texto;
  var valor = 0;

  //$('#conectNginx').on('click', function(req, res) {
  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: "/folder",
      data: {},
      success: function(data) {
        //console.log(data);
        //console.log(data.message);
        arr = data.stdout;
        //alert(data.stdout);
        //alert(arr);
        texto = data.stdout;
        //arr = ["1-cache.conf", "3-redirect.conf", "default.conf", "xpto1.pt.conf", "xpto.pt.conf"];
        var out = JSON.parse(texto);
        out = JSON.stringify(out);
        //alert(out);
        var out = JSON.parse(texto);
        //alert(out[1]);
        var out1 = out.length;
        //if (atrib >= 1){
        //  $('#fich').parent('div').remove();
        //  $('#ficheiros').append('<div id="fich"></div>');
        //};
        valor = out.length
        for (var i = 0; i < out.length; i++) {
          if (i >= 2) {
            console.log(out[i]);
            //$('#ficheiros').text(out[i]);
            $('#ficheiros').append('<div><div id="rmv" class="input-group"><input id="label' + i + '" type="text" class="form-control" value="' + (out[i]) + '"/><span class="input-group-btn"><button class="btn btn-danger remove-me" type="button" id="remove' + i + '">Remove</button></span></div></br></div>'); //add input box
          } else if (i == 1) {

            $('#ficheiros').append('<div class="form-group"><input id="label' + i + '" type="text" class="form-control" value="' + (out[i]) + '"/></div></div>'); //add input box
          } else if (i == 0) {
            $('#ficheiros').html('<div><div class="form-group"><input id="label' + i + '" type="text" class="form-control" value="' + (out[i]) + '"/></div></div>'); //add input box
          };
          //alert(labelt);
        };
        atrib = 1;
        //alert(out1);
        //$('#ficheiros').text(data.stdout);
        $(data).find("a:contains(.config)").each(function() {
          // will loop through
          alert("Found this files: " + $(data.stdout).attr("href"));
          console.log(data);

        });
      },
      dataType: 'json',
      contentType: 'application/json'
    });
    //});
  }, 5000);

  $(document).on("click", ".remove-me", function() {
    console.log($(this).parent().parent().find('input').val());
    $.ajax({
      type: 'POST',
      url: '/remover',
      data: JSON.stringify({
        'labelt': $(this).parent().parent().find('input').val()
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  // MIME Types
  $(document).on("click", ".mime-type", function() {
    console.log('TESTE1:' + $(this).val());
    //$('#botoes').append('<input type="text" value="' + $(this).val() + '" data-role="tagsinput" />' ); //add input box
    //$('#mime').val()=$(this).val();
    $('#mime').tagsinput('add', $(this).val());
  });
  var mytime = setInterval(function() {
    $('#mime').tagsinput('add', 'js,css,png,jpg,jpeg,gif,ico');
    clearInterval(mytime);
  }, 100);

  //var obj;
  $('#mime').on('change', function(event) {
    var $element = $(event.target),
    $container = $element.closest('.example');
      if (!$element.data('tagsinput'))
        return;
        var val = $element.val();
        if (val === null)
          val = "null";
          //$('code', $('pre.val', $container)).html(($.isArray(val) ? JSON.stringify(val) : "\"" + val.replace('"', '\\"') + "\""));
          //$('code', $('pre.items', $container)).html(JSON.stringify($element.tagsinput('items')));
          $('#mime1').val($(this).val().replace(/,/g,"|"));
            $('#mimeh1').val($(this).val().replace(/,/g,"|"));
    //obj = $(this).val();
    //obj =   $(this).val();

    //$('#mime1').val($(this).val());
    //console.log(obj.replace(/,/g,"|"));

  }).trigger('change');


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
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  //Load Balancer - Adicionar e Remover novos Campos
  $(document).ready(function() {
    var max_fields = 3; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $(".add_field_button"); //Add button ID
    var x = 1; //initlal text box count
    var y = 1;
    $(add_button).click(function(e) { //on add input button click
      e.preventDefault();
      if (x < max_fields) { //max input box allowed
        if (x == 1) {
          $('#host3lb').remove();
        }
        if (x == 2) {
          $('#host4lb').remove();
        }
        x++; //text box increment
        y = x + 1;
        //$(wrapper).append('<div><div class="input-group"><input type="text" class="form-control" placeholder="Server IP..." name="mytext[]"/><a href="#" class="remove_field"><span class="input-group-btn"><button id="remove" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-minus"></span> Remove</button></span></a></div></br></br></div>'); //add input box
        $(wrapper).append('<div><input type="text" class="form-control" value="server www.sapo' + y + '.pt" name="mytext[]" id="host' + y + 'lb"/><a href="#" class="remove_field"><button id="remove" type="button" class="btn btn-danger">X Remove</span></button></a><br></br></div>'); //add input box
      }
    });

    $(wrapper).on("click", ".remove_field", function(e) { //user click on remove text
      e.preventDefault();
      $(this).parent('div').remove();
      x--;
      if (x == 1) {
        $(wrapper).append('<input type="hidden" class="form-control" id="host3lb" value="" mytext[] "">');
      }
      if (x == 2) {
        $(wrapper).append('<input type="hidden" class="form-control" id="host4lb" value="" mytext[] "">');
      }
    })
  });

  $('#createLB').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/hostlb',
      data: JSON.stringify({
        'filenamelb': $('#filenamelb').val(),
        'host1lb': $('#host1lb').val(),
        'host2lb': $('#host2lb').val(),
        'host3lb': $('#host3lb').val(),
        'host4lb': $('#host4lb').val(),
        'portlb': $('#portlb').val(),
        'destinationlb': $('#destinationlb').val(),
        'cachelb': $('#cachelb').is(':checked')
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });
  // Redirects OPT1
  $('#createRedirOpt1').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/hostopt1',
      data: JSON.stringify({
        'hostop1': $('#filenameopt1').val(),
        'host1opt1': $('#host1opt1').val(),
        'host2opt1': $('#host2opt1').val(),
        'portopt1': $('#portopt1').val(),
        'destinationopt1': $('#destinationopt1').val(),
        'cacheopt1': $('#cacheopt1').is(':checked'),
        'proxyopt1': $('#destinationopt1').val()
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  // Redirects OPT2
  $('#createRedirOpt2').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/hostopt2',
      data: JSON.stringify({
        'hostop2': $('#filenameopt2').val(),
        'host1opt2': $('#host1opt2').val(),
        'host2opt2': $('#host2opt2').val(),
        'portopt2': $('#portopt2').val(),
        'destinationopt2': $('#destinationopt2').val(),
        'cacheopt2': $('#cacheopt2').is(':checked'),
        'proxyopt2': $('#destinationopt2').val()
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  // Redirects OPT3
  $('#createRedirOpt3').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/hostopt3',
      data: JSON.stringify({
        'hostop3': $('#filenameopt3').val(),
        'host1opt3': $('#host1opt3').val(),
        'host2opt3': $('#host2opt3').val(),
        'portopt3': $('#portopt3').val(),
        'destinationopt3': $('#destinationopt3').val(),
        'cacheopt3': $('#cacheopt3').is(':checked'),
        'proxyopt3': $('#destinationopt3').val()
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
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
    $('#tab-list').append($('<li><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Configuração ' + tabID + '<button class="close" type="button" title="Remove this page">×</button></a></li>'));
    $('#tab-content').append($('<div class="tab-pane fade" id="tab' + tabID + '"><form id="teste"><p>' + '</p><div class="form-group"><label for="host">Host:</label><div class="form-input"><input type="text" class="form-control" id="host' + tabID + '" value="xpto' + tabID + '.pt" name="host"></div></div><div class="form-group"><label for="port">Port:</label><div class="form-input"><input type="text" class="form-control" id="port' + tabID + '" value="80"></div></div><div class="form-group"><label for="host">Mime Types:</label><div class="form-input"><input type="text" class="form-control" id="mimeh' + tabID + '" value="js|css|png|jpg|jpeg|gif|ico" name="host"></div></div><div class="form-group"><label for="destination">Destination:</label><div class="form-input"><input type="text" class="form-control" id="destination' + tabID + '" value="http://127.0.0.1:300' + tabID + '"></div></div><div class="checkbox"><label><div class="form-input"><input type="checkbox" id="cachemv' + tabID + '">Static assets cache</div></label></div></form></div>'));
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
    hostcreate()
  })

  function hostcreate() {
    var count = 0;
    //Nº de valores dentro do array

    $("#tabs").each(function() {
      //$(this).find(".nav-tabs li").each(function(index, element) {
      count = 0;
      conta = 1;
      var valor1;
      var valor2;
      var valor3;
      var valor4;
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
          a = $(this).val();
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor4 = a;
        } else if (conta == 5) {
          a = $(this).is(':checked');
          console.log('valor:' + a);
          console.log('Conta:' + conta);
          valor5 = a;
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
              'mimeh': valor3,
              'destination': valor4,
              'cache': $(this).is(':checked'),
              'proxy': valor5
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
